'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../posts/posts.module.css';
import { parseMarkdown } from '@/lib/markdown';
import Link from 'next/link';
import Header from '@/app/components/common/Header/Header';
import { supabase } from '@/lib/supabase';

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

export default function DevJournalDetailPage() {
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

        const { data, error } = await supabase
          .from('devjournal')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Post not found');

        // 조회수 증가
        const { error: updateError } = await supabase
          .from('devjournal')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id);

        if (updateError) console.error('Failed to update view count:', updateError);

        const { content } = await parseMarkdown(data.content);
        
        const processedPost: ProcessedPost = {
          ...data,
          id: data.id.toString(),
          content,
          frontMatter: {
            title: data.title,
            date: data.reg_date,
            categories: data.category ? [data.category] : [],
          },
          tags: data.tags || []
        };

        setPost(processedPost);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.slug]);

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
