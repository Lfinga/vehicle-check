import { createClient } from '../supabase/server';
import { Database } from '@/types/supabase';

type Picture = Database['public']['Tables']['pictures']['Row'];

export async function getPictureDatesForVehicle(vehicleId: number): Promise<string[]> {
  const supabase = await createClient();
  
  const { data: pictures, error } = await supabase
    .from('pictures')
    .select('created_at')
    .eq('vehicule_id', vehicleId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching picture dates:', error);
    return [];
  }

  // Get unique dates (YYYY-MM-DD format)
  const uniqueDates = [...new Set(
    pictures?.map((pic: { created_at: string }) => new Date(pic.created_at).toISOString().split('T')[0]) || []
  )] as string[];

  return uniqueDates;
}

export async function getPicturesByDate(vehicleId: number, date: string): Promise<Picture[]> {
  const supabase = await createClient();
  
  // Get pictures for the specific date
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  const { data: pictures, error } = await supabase
    .from('pictures')
    .select('*')
    .eq('vehicule_id', vehicleId)
    .gte('created_at', startDate.toISOString())
    .lt('created_at', endDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching pictures:', error);
    return [];
  }

  return pictures || [];
} 
