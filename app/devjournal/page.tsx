'use client';

import { useEffect, useState } from 'react';
import styles from '../posts/posts.module.css';
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

export default function DevJournalPage() {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/devjournal');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        
        // Process markdown content for each post
        const processedPosts = await Promise.all(
          data.map(async (post) => {
            const { content } = await parseMarkdown(post.content);
            return {
              ...post,
              content,
              frontMatter: {
                title: post.title,
                date: post.reg_date,
                categories: [post.category]
              }
            };
          })
        );
        
        setPosts(processedPosts);
      } catch (err) {
        console.error('Error processing posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>
        <Link href="/" className={styles.titleLink}>
          개발 일지
        </Link>
      </h1>
      <div className={styles.postsGrid}>
        {posts.map((post, index) => (
          <Link href={`/devjournal/${post.slug}`} key={post.id}>
            <div className={styles.postCard}>
              {post.featured_image && (
                <div className={styles.imageWrapper}>
                  <img src={post.featured_image} alt={post.frontMatter.title} />
                </div>
              )}
              {post.is_featured && <span className={styles.featuredBadge}>Featured</span>}
              <h2 className={styles.postTitle}>{post.frontMatter.title}</h2>
              <div className={styles.categories}>
                <span className={styles.category}>{post.category}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag: string) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div 
                className={styles.markdownContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
