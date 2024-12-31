import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
}

interface DatabasePost extends Omit<Post, 'id' | 'tags'> {
  id: number;
  tags: string | null;
}

interface ProcessedPost extends Omit<Post, 'tags'> {
  tags: string[];
}

export async function GET() {
  try {    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .not('category', 'eq', 'DevJournal')
      .order('reg_date', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const dbPosts = data as DatabasePost[];

    // 응답 데이터 처리
    const processedData: Post[] = dbPosts.map(post => ({
      ...post,
      id: post.id.toString(),
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
    }));

    return NextResponse.json(processedData)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const testPost: Post = {
      id: 'test-id',
      slug: 'test-post',
      title: '테스트 포스트',
      content: '이것은 테스트 포스트입니다.',
      view_count: 0,
      likes_count: 0,
      reg_date: new Date().toISOString(),
      modify_date: new Date().toISOString(),
      featured_image: null,
      excerpt: null,
      is_featured: false,
      category: 'test-category',
      tags: ['test-tag1', 'test-tag2']
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([testPost])
      .select()

    if (error) {
      console.error('Error inserting test post:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
