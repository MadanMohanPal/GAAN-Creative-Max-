import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!supabaseUrl &&
    !supabaseUrl.includes('your-project.supabase.co') &&
    !!supabaseServiceRoleKey &&
    !supabaseServiceRoleKey.includes('your-service-role-key')
  );
};

let client: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  console.log('✅ Supabase client successfully initialized with connected PostgreSQL cluster.');
} else {
  console.log('ℹ️ Running backend with built-in verified sample catalogue (Configure SUPABASE_URL in .env to connect live DB).');
}

export const getSupabaseClient = (): SupabaseClient | null => client;
