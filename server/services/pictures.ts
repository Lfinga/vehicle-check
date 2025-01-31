import { createClient } from '../supabase/server';
import { Database } from '@/types/supabase';

type Picture = Database['public']['Tables']['pictures']['Row'];

export type PictureWithDriver = Picture & {
  driver_name: string | null;
};

type PictureWithUser = {
  created_at: string;
  users: {
    first_name: string | null;
    last_name: string | null;
  } | null;
};

export async function getPictureDatesForVehicle(vehicleId: number): Promise<{ date: string; driver_name: string }[]> {
  const supabase = await createClient();
  
  const { data: pictures, error } = await supabase
    .from('pictures')
    .select(`
      created_at,
      users (
        first_name,
        last_name
      )
    `)
    .eq('vehicule_id', vehicleId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching picture dates:', error);
    return [];
  }

  // Get unique dates with driver names
  const datesWithDrivers = pictures?.map((pic: PictureWithUser) => ({
    date: new Date(pic.created_at).toISOString().split('T')[0],
    driver_name: pic.users ? `${pic.users.first_name || ''} ${pic.users.last_name || ''}`.trim() || 'Unknown Driver' : 'Unknown Driver'
  })) || [];

  // Remove duplicates while keeping the first occurrence (latest driver)
  const uniqueDatesWithDrivers = Array.from(
    datesWithDrivers.reduce((map, item) => {
      if (!map.has(item.date)) {
        map.set(item.date, item);
      }
      return map;
    }, new Map()).values()
  );

  return uniqueDatesWithDrivers;
}

type PictureWithUserFull = Picture & {
  users: {
    first_name: string | null;
    last_name: string | null;
  } | null;
};

export async function getPicturesByDate(vehicleId: number, date: string): Promise<PictureWithDriver[]> {
  const supabase = await createClient();
  
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  const { data: pictures, error } = await supabase
    .from('pictures')
    .select(`
      *,
      users (
        first_name,
        last_name
      )
    `)
    .eq('vehicule_id', vehicleId)
    .gte('created_at', startDate.toISOString())
    .lt('created_at', endDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching pictures:', error);
    return [];
  }

  return (pictures || []).map((pic: PictureWithUserFull) => ({
    ...pic,
    driver_name: pic.users ? `${pic.users.first_name || ''} ${pic.users.last_name || ''}`.trim() || 'Unknown Driver' : 'Unknown Driver'
  }));
} 
