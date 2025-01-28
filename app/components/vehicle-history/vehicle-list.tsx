import { getAllVehicles } from '@/server/services/vehicles';
import { Database } from '@/types/supabase';
import Link from 'next/link';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

export default async function VehicleList({ query }: { query?: string }) {
  const vehicles = await getAllVehicles(query);

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-800'>
      <table className='min-w-full divide-y divide-gray-800'>
        <thead className='bg-gray-900'>
          <tr>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Brand</th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Model</th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
              License Plate
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Year</th>
          </tr>
        </thead>
        <tbody className='bg-gray-900/50 divide-y divide-gray-800'>
          {vehicles?.length === 0 ? (
            <tr>
              <td colSpan={4} className='px-6 py-4 text-center text-gray-400'>
                No vehicles found
              </td>
            </tr>
          ) : (
            vehicles?.map((vehicle: Vehicle) => (
              <tr key={vehicle.id} className='hover:bg-gray-800/50 transition-colors cursor-pointer'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <Link href={`/vehicle/${vehicle.id}`} className='block w-full h-full'>
                    {vehicle.brand}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <Link href={`/vehicle/${vehicle.id}`} className='block w-full h-full'>
                    {vehicle.model}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <Link href={`/vehicle/${vehicle.id}`} className='block w-full h-full'>
                    {vehicle.license_plate}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <Link href={`/vehicle/${vehicle.id}`} className='block w-full h-full'>
                    {vehicle.year}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
