import { notFound } from 'next/navigation';
import Link from 'next/link';
import PictureViewer from '@/app/components/vehicle/picture-viewer';
import { getCheckInById } from '@/server/services/check_ins';
import { getPicturesByCheckInId } from '@/server/services/pictures';
import { Database } from '@/types/supabase';

type PictureWithDriver = Database['public']['Tables']['pictures']['Row'] & {
  driver_name: string;
};

export default async function CheckInDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const checkIn = await getCheckInById(parseInt(id));
  if (!checkIn || !checkIn.vehicles || !checkIn.users) {
    notFound();
  }

  const pictures = await getPicturesByCheckInId(parseInt(id));
  const driverName = `${checkIn.users.first_name || ''} ${checkIn.users.last_name || ''}`.trim() || 'Unknown Driver';

  const picturesWithDriver: PictureWithDriver[] = pictures.map((pic) => ({
    ...pic,
    driver_name: driverName,
  }));

  const formattedDate = new Date(checkIn.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <Link
              href={`/admin/drivers/${checkIn.users.id}`}
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
              Back to Driver
            </Link>
            <h1 className='text-3xl font-bold text-white'>
              {checkIn.vehicles.brand} {checkIn.vehicles.model}
            </h1>
          </div>

          <div className='mb-8'>
            <h2 className='text-xl font-bold text-white mb-2'>Check-in from {formattedDate}</h2>
            <div className='space-y-2 text-gray-400 text-sm mb-6'>
              <p>License Plate: {checkIn.vehicles.license_plate}</p>
              <p>Driver: {driverName}</p>
              {checkIn.notes && <p>Notes: {checkIn.notes}</p>}
            </div>

            {!picturesWithDriver.length ? (
              <div className='text-gray-400 text-center py-8 bg-gray-900/50 rounded-lg'>
                No pictures available for this check-in
              </div>
            ) : (
              <PictureViewer pictures={picturesWithDriver} vehicle={checkIn.vehicles} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
