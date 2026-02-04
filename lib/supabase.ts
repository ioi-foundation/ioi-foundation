import { createClient } from '@supabase/supabase-js';

// Safely access environment variables, handling cases where import.meta.env is undefined
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

// Fail hard in production if keys are missing to avoid silent failures
if (env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error("Fatal: Supabase keys missing in production environment. Please check your deployment settings.");
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. App running in offline/demo mode.');
}

// Initialize client with fallback values to prevent runtime crash in dev/test
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);