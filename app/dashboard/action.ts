'use server';

import { createClient } from '@/server/supabase/server';

export async function getDriverStats() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get total check-ins for the driver
  const { count: totalCheckIns } = await supabase
    .from('pictures')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  // Get last check-in date
  const { data: lastCheckIn } = await supabase
    .from('pictures')
    .select('created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return {
    totalCheckIns: totalCheckIns!/4 || 0,
    lastCheckInDate: lastCheckIn?.created_at || null,
  };
} 