'use client';

import Link from 'next/link';
import styles from '../posts.module.css';
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
  frontMatter: {
    title: string;
    date?: string;
    categories?: string[];
  };
}

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <article className={styles.post}>
          <header>
            <h1>{post.title}</h1>
            <div className={styles.metadata}>
              <time>{new Date(post.reg_date).toLocaleDateString()}</time>
              {post.category && (
                <>
                  <span className={styles.separator}>•</span>
                  <span>{post.category}</span>
                </>
              )}
            </div>
          </header>
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          <footer>
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </footer>
        </article>
        <div className={styles.navigation}>
          <Link href="/posts">← Back to Posts</Link>
        </div>
      </main>
    </div>
  );
}
