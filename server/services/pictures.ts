import { createClient } from '../supabase/server';
import { Database } from '@/types/supabase';

type Picture = Database['public']['Tables']['pictures']['Row'];

export type PictureWithDriver = Picture & {
  driver_name: string;
};

type CheckInWithDriver = {
  created_at: string;
  driver: {
    first_name: string | null;
    last_name: string | null;
  } | null;
};

interface GetPictureDatesOptions {
  startDate?: string;
  endDate?: string;
  driver?: string;
}

export async function getPicturesByCheckInId(checkInId: number): Promise<Picture[]> {
  const supabase = await createClient();

  const { data: pictures, error } = await supabase
    .from('pictures')
    .select('*')
    .eq('check_in_id', checkInId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching pictures:', error);
    return [];
  }

  return pictures || [];
}

export async function getPictureDatesForVehicle(
  vehicleId: number,
  options?: GetPictureDatesOptions
): Promise<{ date: string; driver_name: string }[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('check_ins')
    .select(`
      created_at,
      driver:driver_id (
        first_name,
        last_name
      )
    `)
    .eq('vehicle_id', vehicleId);

  // Apply date range filter if provided
  if (options?.startDate) {
    const startDate = new Date(options.startDate);
    query = query.gte('created_at', startDate.toISOString());
  }
  
  if (options?.endDate) {
    const endDate = new Date(options.endDate);
    endDate.setDate(endDate.getDate() + 1); // Include the entire end date
    query = query.lt('created_at', endDate.toISOString());
  }

  const { data: checkIns, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching picture dates:', error);
    return [];
  }

  // Get unique dates with driver names
  const datesWithDrivers = (checkIns as CheckInWithDriver[])?.map((checkIn) => {
    const driverName = checkIn.driver ? 
      `${checkIn.driver.first_name || ''} ${checkIn.driver.last_name || ''}`.trim() || 'Unknown Driver' 
      : 'Unknown Driver';
    return {
      date: new Date(checkIn.created_at).toISOString().split('T')[0],
      driver_name: driverName
    };
  }) || [];

  // Filter by driver name if provided
  const filteredDates = options?.driver
    ? datesWithDrivers.filter(item => 
        item.driver_name.toLowerCase().includes(options.driver!.toLowerCase())
      )
    : datesWithDrivers;

  // Remove duplicates while keeping the first occurrence (latest driver)
  const uniqueDatesWithDrivers = Array.from(
    filteredDates.reduce((map, item) => {
      if (!map.has(item.date)) {
        map.set(item.date, item);
      }
      return map;
    }, new Map()).values()
  );

  return uniqueDatesWithDrivers;
}

export async function getPicturesByDate(vehicleId: number, date: string): Promise<PictureWithDriver[]> {
  const supabase = await createClient();
  
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  // First get the check-ins for this vehicle and date range
  const { data: checkIns, error: checkInsError } = await supabase
    .from('check_ins')
    .select(`
      id,
      driver:driver_id (
        first_name,
        last_name
      )
    `)
    .eq('vehicle_id', vehicleId)
    .gte('created_at', startDate.toISOString())
    .lt('created_at', endDate.toISOString());

  if (checkInsError) {
    console.error('Error fetching check-ins:', checkInsError);
    return [];
  }

  if (!checkIns?.length) {
    return [];
  }

  // Then get all pictures for these check-ins
  const { data: pictures, error: picturesError } = await supabase
    .from('pictures')
    .select('*')
    .in('check_in_id', checkIns.map(c => c.id))
    .order('created_at', { ascending: true });

  if (picturesError) {
    console.error('Error fetching pictures:', picturesError);
    return [];
  }

  // Map the check-ins to a lookup object for easier access
  const checkInMap = new Map(
    checkIns.map(checkIn => [
      checkIn.id,
      checkIn.driver ? 
        `${checkIn.driver.first_name || ''} ${checkIn.driver.last_name || ''}`.trim() || 'Unknown Driver'
        : 'Unknown Driver'
    ])
  );

  return (pictures || []).map(pic => ({
    ...pic,
    driver_name: checkInMap.get(pic.check_in_id) || 'Unknown Driver'
  }));
} 
