// lib/supabaseHelpers.ts
import { createClient } from '@supabase/supabase-js';
import { getAuthCookie } from '@/utils/auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getCurrentUsername(): Promise<string | null> {
  const id = getAuthCookie();
  if (!id) {
    console.error('No id found in auth cookie');
    return null;
  }


    
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching username from profiles:', error.message);
    return null;
  }

  return data?.username ?? null;
}
