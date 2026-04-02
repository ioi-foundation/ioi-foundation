import { createClient } from '@supabase/supabase-js';

// Safely access environment variables, handling cases where import.meta.env is undefined
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseConfig) {
  console.warn('Missing Supabase environment variables. App running in offline/demo mode.');
}

// Keep the client shape available even when the backend is intentionally absent.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
