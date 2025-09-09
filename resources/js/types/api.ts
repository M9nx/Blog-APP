// User types
export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  bio?: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// Post types
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  user_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  tags: Tag[];
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

// Comment types
export interface Comment {
  id: number;
  body: string;
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  created_at: string;
  updated_at: string;
  user: User;
  replies?: Comment[];
  likes_count: number;
  replies_count: number;
  is_liked: boolean;
}

// Tag types
export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

// Like types
export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

// Auth types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

// Form types
export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  tags?: number[];
}

export interface CommentFormData {
  body: string;
}
