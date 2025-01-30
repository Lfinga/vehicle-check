import { getAllVehicles } from '@/server/services/vehicles';
import VehicleCarousel from './vehicle-list';

export default async function VehicleListContainer({ query }: { query?: string }) {
  const vehicles = await getAllVehicles(query);

  return <VehicleCarousel vehicles={vehicles} />;
}
