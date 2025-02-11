'use client';

import Link from 'next/link';
import { Database } from '@/types/supabase';
import DeleteDriverButton from './delete-driver-button';
import { useRouter } from 'next/navigation';

type Driver = Database['public']['Tables']['users']['Row'];

interface DriversListProps {
  drivers: Driver[];
}

export default function DriversList({ drivers }: DriversListProps) {
  const router = useRouter();

  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className='block p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-900/75 transition-colors'
        >
          <div className='mb-4'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              {driver.first_name} {driver.last_name}
            </h3>
            <div className='text-gray-400'>
              <p>{driver.email}</p>
            </div>
          </div>
          <div className='flex items-center justify-between pt-4 border-t border-gray-700'>
            <DeleteDriverButton
              driverId={driver.id}
              driverName={`${driver.first_name || ''} ${driver.last_name || ''}`.trim() || driver.email}
              onDeleted={() => router.refresh()}
            />
            <Link
              href={`/admin/drivers/${driver.id}`}
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors'
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
