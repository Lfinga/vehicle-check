import { createClient } from '@/server/supabase/server';

export async function getAllVehicles(query?: string) {
  const supabase = await createClient();
  
  let vehicleQuery = supabase.from('vehicles').select('*');
  
  if (query) {
    vehicleQuery = vehicleQuery.or(
      `brand.ilike.%${query}%,` +
      `model.ilike.%${query}%,` +
      `license_plate.ilike.%${query}%,` +
      `year.ilike.%${query}%`
    );
  }

  const { data: vehicles, error } = await vehicleQuery;

  if (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }

  return vehicles;
}

export async function getVehicleById(id: number) {
  const supabase = await createClient();
  try {
    const { data: vehicle, error } = await supabase
      .from('vehicles')
      .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }

    return vehicle;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return null;
  }
}
