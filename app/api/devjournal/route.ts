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

export async function GET() {
  try {    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', 'DevJournal')
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
