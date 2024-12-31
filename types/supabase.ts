export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          content: string
          view_count: number
          likes_count: number
          reg_date: string
          modify_date: string
          featured_image: string | null
          excerpt: string | null
          is_featured: boolean
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: string
          view_count?: number
          likes_count?: number
          reg_date?: string
          modify_date?: string
          featured_image?: string | null
          excerpt?: string | null
          is_featured?: boolean
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string
          view_count?: number
          likes_count?: number
          reg_date?: string
          modify_date?: string
          featured_image?: string | null
          excerpt?: string | null
          is_featured?: boolean
        }
      }
    }
  }
}
