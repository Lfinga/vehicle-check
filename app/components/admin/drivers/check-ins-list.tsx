'use client';

import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Database } from '@/types/supabase';
import { usePathname } from 'next/navigation';

type CheckIn = Database['public']['Tables']['check_ins']['Row'] & {
  vehicles: {
    id: number;
    brand: string;
    model: string;
    license_plate: string;
  } | null;
};

interface CheckInsListProps {
  checkIns: CheckIn[];
}

export default function CheckInsList({ checkIns }: CheckInsListProps) {
  const pathname = usePathname();
  const isDriverRoute = pathname.startsWith('/driver');

  if (checkIns.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-400'>No check-ins found.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {checkIns.map(
        (checkIn) =>
          checkIn.vehicles && (
            <div key={checkIn.id} className='p-6 bg-gray-900/50 border border-gray-700 rounded-lg'>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    {checkIn.vehicles.brand} {checkIn.vehicles.model}
                  </h3>
                  <p className='text-gray-400'>License Plate: {checkIn.vehicles.license_plate}</p>
                </div>
                <p className='text-sm text-gray-400'>
                  {formatDistanceToNow(new Date(checkIn.created_at), { addSuffix: true })}
                </p>
              </div>
              {checkIn.notes && (
                <div className='mt-4'>
                  <p className='text-gray-400'>{checkIn.notes}</p>
                </div>
              )}
              <div className='mt-4'>
                <Link
                  href={isDriverRoute ? `/driver/check-ins/${checkIn.id}` : `/admin/check-ins/${checkIn.id}`}
                  className='text-blue-500 hover:text-blue-400'
                >
                  View Details →
                </Link>
              </div>
            </div>
          )
      )}
    </div>
  );
}
