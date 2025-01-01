'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../posts/posts.module.css';
import Header from '../components/common/Header/Header';
import { supabase } from '@/lib/supabase';
import { parseMarkdown } from '@/lib/markdown';

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

export default function DevJournal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('category', 'DevJournal')
          .order('reg_date', { ascending: false });

        if (error) throw error;

        const processedPosts = await Promise.all(
          data.map(async (post) => {
            const { content } = await parseMarkdown(post.content);
            return {
              ...post,
              id: post.id.toString(),
              content,
              frontMatter: {
                title: post.title,
                date: post.reg_date,
                categories: post.category ? [post.category] : []
              },
              tags: post.tags || []
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Dev Journal</h1>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link href={`/devjournal/${post.slug}`} key={post.id} className={styles.card}>
              {post.featured_image && (
                <div className={styles.cardImage}>
                  <img src={post.featured_image} alt={post.title} />
                </div>
              )}
              <div className={styles.cardContent}>
                <h2>{post.title}</h2>
                {post.excerpt && <p>{post.excerpt}</p>}
                <div className={styles.metadata}>
                  <time>{new Date(post.reg_date).toLocaleDateString()}</time>
                  {post.category && (
                    <>
                      <span className={styles.separator}>•</span>
                      <span>{post.category}</span>
                    </>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.tags}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
