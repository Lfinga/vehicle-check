import { createClient } from '@/server/supabase/server';

export async function getAllVehicles() {
  const supabase = await createClient();
  
  const { data: vehicles, error } = await supabase.from('vehicles').select('*'); 

  if (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }

  return vehicles;
} 