import { getAllVehicles } from '@/server/services/vehicles';
import { createClient } from '@/server/supabase/server';
import VehicleCarousel from './vehicle-list';

export default async function VehicleListContainer({ query }: { query?: string }) {
  const vehicles = await getAllVehicles(query);
  const supabase = await createClient();

  // Fetch the latest picture for each vehicle
  const vehiclesWithPictures = await Promise.all(
    vehicles.map(async (vehicle) => {
      const { data: pictures } = await supabase
        .from('pictures')
        .select('picture_url')
        .eq('vehicule_id', vehicle.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      return {
        ...vehicle,
        latest_picture: pictures ? { picture_url: pictures.picture_url } : undefined,
      };
    })
  );

  return <VehicleCarousel vehicles={vehiclesWithPictures} />;
}
