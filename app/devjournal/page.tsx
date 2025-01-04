'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../devjournal/devjournal.module.css';
import Header from '../components/common/Header/Header';
import { supabase } from '@/lib/supabase';
import { parseMarkdown } from '@/lib/markdown';

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  reg_date: string;
  modify_date: string | null;
  featured_image: string | null;
  excerpt: string | null;
  category: string;
  tags: string[];
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
            const processedPost = {
              ...post,
              id: post.id.toString(),
              tags: Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : []),
              content,
            };
            return processedPost;
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
        <h1 className={styles.title}>
          <Link href="/" className={styles.titleLink}>
            개발 일지
          </Link>
        </h1>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link href={`/devjournal/${post.slug}`} key={post.id} className={styles.card}>
              <time className={styles.postDate}>
                {new Date(post.reg_date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{post.title}</h2>
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
