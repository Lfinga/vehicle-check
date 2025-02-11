import Link from 'next/link';
import { Database } from '@/types/supabase';

type Driver = Database['public']['Tables']['users']['Row'];

interface DriversListProps {
  drivers: Driver[];
}

export default function DriversList({ drivers }: DriversListProps) {
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {drivers.map((driver) => (
        <Link
          key={driver.id}
          href={`/admin/drivers/${driver.id}`}
          className='block p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-900/75 transition-colors'
        >
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-white'>
              {driver.first_name} {driver.last_name}
            </h3>
          </div>
          <div className='text-gray-400'>
            <p>{driver.email}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
