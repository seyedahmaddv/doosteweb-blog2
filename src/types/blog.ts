export type Author = {
  id?: number
  name: string
  avatar?: string | null
}

export type Comment = {
  id?: number
  post_id?: number
  profile_name?: string | null
  profile_email?: string | null
  profile_phone?: string | null
  profile_avatar?: string | null
  content: string
  status?: 'pending' | 'approved' | 'rejected'
  parent_comment_id?: number | null
  created_at?: string
}

export type Post = {
  id?: number
  title: string
  content: string
  cover_img?: string | null
  created_at?: string
  views?: number
  shares?: number
  category?: string | null
  featured?: boolean
  author?: Author | null
  tags?: string[]
}

export type User = {
  id?: number
  username: string
  email: string
  password?: string
  role?: 'user' | 'admin'
  created_at?: string
}

export type Category = {
  id?: number
  name: string
  slug: string
  description?: string
}

export type Tag = {
  id?: number
  name: string
  slug: string
}
