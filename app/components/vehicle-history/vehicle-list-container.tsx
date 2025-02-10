import { getAllVehicles } from '@/server/services/vehicles';
import VehicleList from './vehicle-list';

export default async function VehicleListContainer({ query }: { query?: string }) {
  const vehicles = await getAllVehicles(query);

  return <VehicleList vehicles={vehicles} />;
}
