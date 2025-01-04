'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './posts.module.css';
import { supabase } from '@/lib/supabase';
import { parseMarkdown, PostData } from '@/lib/markdown';

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

export default function PostsPage() {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .neq('category', 'DevJournal')
          .order('reg_date', { ascending: false });

        if (error) throw error;

        const processedPosts = await Promise.all(
          data.map(async (post) => {
            const { content } = await parseMarkdown(post.content);
            return {
              ...post,
              id: post.id.toString(),
              tags: Array.isArray(post.tags) ? post.tags : [],
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
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="spinner">
      <div></div>
    </div>
  );
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link href="/" className={styles.titleLink}>
          블로그 포스트
        </Link>
      </h1>
      <div className={styles.postsGrid}>
        {posts.map((post, index) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <div className={styles.cardContent}>
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
              <div className={styles.postMeta}>
                <time className={styles.date}>
                  {new Date(post.reg_date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <div className={styles.stats}>
                  <span>조회 {post.view_count}</span>
                  <span>좋아요 {post.likes_count}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}