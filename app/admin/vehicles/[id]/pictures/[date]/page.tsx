import { getPicturesByDate } from '@/server/services/pictures';
import { getVehicleById } from '@/server/services/vehicles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PictureViewer from '@/app/components/vehicle/picture-viewer';

export default async function VehiclePicturesPage({ params }: { params: Promise<{ id: string; date: string }> }) {
  const { id, date } = await params;
  const vehicle = await getVehicleById(parseInt(id));
  const pictures = await getPicturesByDate(parseInt(id), date);

  if (!vehicle) {
    notFound();
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
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
              href={`/admin/vehicles/${id}`}
              className='group flex items-center gap-2 text-gray-400 hover:text-white transition-colors'
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
              Back to the vehicle
            </Link>
            <h1 className='text-3xl font-bold text-white'>
              {vehicle.brand} {vehicle.model}
            </h1>
          </div>

          <div className='mb-8'>
            <h2 className='text-xl font-bold text-white mb-2'>Pictures from {formattedDate}</h2>
            <p className='text-gray-400 text-sm mb-6'>License Plate: {vehicle.license_plate}</p>

            {pictures.length === 0 ? (
              <div className='text-gray-400 text-center py-8 bg-gray-900/50 rounded-lg'>
                No pictures available for this date
              </div>
            ) : (
              <PictureViewer pictures={pictures} vehicle={vehicle} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
