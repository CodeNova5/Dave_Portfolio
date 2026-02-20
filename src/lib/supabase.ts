import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  tech_stack: string[];
  results?: string;
  image_url?: string;
  screenshots: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}
