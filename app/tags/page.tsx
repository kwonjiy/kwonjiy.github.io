"use client";

import { supabase } from '@/lib/supabase';
import styles from "./tags.module.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const revalidate = 0;

interface Tag {
  id: any;
  tag_name: any;
  slug: any;
}

async function getTags() {
  try {
    const { data: tags, error } = await supabase
      .from('tags')
      .select('id, tag_name, slug');

    if (error) {
      console.error('Error fetching tags:', error);
      return [];
    }

    return tags;
  } catch (error) {
    console.error('Unexpected error fetching tags:', error);
    return [];
  }
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
        setError(null);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tags');
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
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
          태그
        </Link>
      </h1>
      <div className={styles.tagsGrid}>
        {tags.map((tag) => (
          <Link href={`/tags/${tag.slug}`} key={tag.id}>
            <div className={styles.cardContent}>
              <h2 className={styles.tagName}>#{tag.tag_name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}