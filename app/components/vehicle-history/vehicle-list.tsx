'use client';

import { Database } from '@/types/supabase';
import Link from 'next/link';
import Image from 'next/image';

type Vehicle = Database['public']['Tables']['vehicles']['Row'] & {
  latest_picture?: {
    picture_url: string | null;
  };
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  if (!vehicles?.length) {
    return (
      <div className='flex items-center justify-center h-64 text-gray-400 bg-gray-900/50 rounded-lg'>
        No vehicles found
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {vehicles.map((vehicle) => (
        <Link
          key={vehicle.id}
          href={`/admin/vehicles/${vehicle.id}`}
          className='group bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 hover:shadow-xl'
        >
          <div className='relative aspect-[16/9]'>
            {vehicle.vehicle_picture_url ? (
              <Image
                src={vehicle.vehicle_picture_url!}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            ) : (
              <div className='absolute inset-0 flex items-center justify-center bg-gray-800/50 text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-12 h-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                  />
                </svg>
              </div>
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'>
              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <div className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900/80 text-gray-300 backdrop-blur-sm'>
                  {vehicle.year}
                </div>
              </div>
            </div>
          </div>

          <div className='p-4 space-y-4'>
            <div>
              <h3 className='text-xl font-semibold text-white group-hover:text-gray-200 transition-colors'>
                {vehicle.brand} {vehicle.model}
              </h3>
              <p className='text-gray-400 text-sm mt-1'>License Plate: {vehicle.license_plate}</p>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 mr-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
                  />
                </svg>
                Added {formatDate(vehicle.created_at)}
              </div>
              <button className='text-gray-400 hover:text-white transition-colors'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
