import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';
import dotenv from 'dotenv';

// Load environment variables from the root directory
dotenv.config({ path: '.env.local' });

export function createAdminClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing required environment variables for Supabase admin client');
  }

  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY);
}
