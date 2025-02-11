import { getFilteredCheckIns } from '@/server/services/check_ins';
import CheckInsList from '@/app/components/admin/drivers/check-ins-list';
import CheckInFilters from '@/app/components/admin/drivers/check-in-filters';
import { notFound } from 'next/navigation';
import { createClient } from '@/server/supabase/server';
import { getAllVehicles } from '@/server/services/vehicles';
import Link from 'next/link';

export default async function DriverPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { startDate, endDate, vehicleId } = (await searchParams) as {
    startDate?: string;
    endDate?: string;
    vehicleId?: string;
  };

  const supabase = await createClient();
  const vehicles = await getAllVehicles();

  const { data: driver } = await supabase.from('users').select('*').eq('id', id).single();

  if (!driver) {
    notFound();
  }

  const checkIns = await getFilteredCheckIns({
    driverId: id,
    startDate,
    endDate,
    vehicleId: vehicleId ? parseInt(vehicleId) : undefined,
  });

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <Link
              href='/admin/drivers'
              className='group flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5 transform group-hover:-translate-x-1 transition-transform'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
              </svg>
              Back to Drivers
            </Link>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            {driver.first_name} {driver.last_name}
          </h1>
          <p className='text-gray-400'>{driver.email}</p>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-white mb-6'>Check-ins History</h2>
          <CheckInFilters vehicles={vehicles} />
          <CheckInsList checkIns={checkIns} />
        </div>
      </main>
    </div>
  );
}
