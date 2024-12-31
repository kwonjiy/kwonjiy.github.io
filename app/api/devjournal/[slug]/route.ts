import { NextRequest, NextResponse } from 'next/server'
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

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const slug = request.nextUrl.pathname.split('/').pop()

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('slug', slug)
      .eq('category', 'DevJournal')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const dbPost = data as DatabasePost;

    // 조회수 증가
    const { error: updateError } = await supabase
      .from('posts')
      .update({ 
        view_count: (dbPost.view_count || 0) + 1,
        modify_date: new Date().toISOString()
      })
      .eq('id', dbPost.id)

    if (updateError) {
      console.error('Failed to update view count:', updateError)
    }

    // 응답 데이터 처리
    const processedData: Post = {
      ...dbPost,
      id: dbPost.id.toString(),
      tags: dbPost.tags ? dbPost.tags.split(',').map(tag => tag.trim()) : []
    }

    return NextResponse.json(processedData)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
