import { supabase } from '@/lib/supabase';
import { parseMarkdown } from '@/lib/markdown';
import styles from '../posts.module.css';
import Link from 'next/link';
import Header from '@/app/components/common/Header/Header';

interface ProcessedPost {
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
  post: ProcessedPost;
}

function PostDetail({ post }: PostDetailProps) {
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
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </footer>
        </article>
        <div className={styles.navigation}>
          <Link href="/posts" className={styles.backButton}>
            <span className="icon"></span> Back to Posts
          </Link>
        </div>
      </main>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Post not found');

  // 조회수 증가
  const { error: updateError } = await supabase
    .from('posts')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', data.id);

  if (updateError) console.error('Failed to update view count:', updateError);

  const { content } = await parseMarkdown(data.content);
  
  const post = {
    ...data,
    id: data.id.toString(),
    content,
    frontMatter: {
      title: data.title,
      date: data.reg_date,
      categories: data.category ? [data.category] : [],
    },
    tags: Array.isArray(data.tags) ? data.tags : []
  };

  return <PostDetail post={post} />;
}

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug');

  return posts?.map((post) => ({
    slug: post.slug,
  })) || [];
}
