'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../posts.module.css';
import { parseMarkdown } from '@/lib/markdown';
import Link from 'next/link';
import Header from '@/app/components/common/Header/Header';

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  view_count: number;
  likes_count: number;
  reg_date: string;
  modify_date: string | null;
  featured_image: string | null;
  excerpt: string | null;
  is_featured: boolean;
  category: string;
  tags: string[];
  frontMatter?: {
    title: string;
    date?: string;
    categories?: string[];
  };
}

interface ProcessedPost extends Post {
  content: string;
  frontMatter: {
    title: string;
    date?: string;
    categories?: string[];
  };
}

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<ProcessedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const slug = params?.slug as string;
        if (!slug) {
          throw new Error('Slug is required');
        }

        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const postData: Post = await response.json();
        const { content } = await parseMarkdown(postData.content);
        
        const processedPost = {
          ...postData,
          content,
          frontMatter: {
            title: postData.title,
            date: postData.reg_date,
            categories: [postData.category]
          }
        };
        
        setPost(processedPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params?.slug]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!post) return <div className={styles.container}>Post not found</div>;

  return (
    <div className={styles.container}>
      <Header />
      <article className={styles.postDetail}>
        <div className={styles.postHeader}>
          <h1 className={styles.title}>{post.frontMatter.title}</h1>
          <div className={styles.metadata}>
            <time>{new Date(post.reg_date).toLocaleDateString()}</time>
            <span>조회수: {post.view_count}</span>
          </div>
          <div className={styles.tags}>
            {post.tags.map((tag: string) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        {post.featured_image && (
          <div className={styles.featuredImage}>
            <img src={post.featured_image} alt={post.frontMatter.title} />
          </div>
        )}
        <div 
          className={styles.markdownContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
