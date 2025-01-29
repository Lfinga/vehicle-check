import { Sidebar } from '@/app/components/sidebar';
import { getPicturesByDate } from '@/server/services/pictures';
import { getVehicleById } from '@/server/services/vehicles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PictureViewer from '@/app/components/vehicle/picture-viewer';

export default async function VehiclePicturesPage({ params }: { params: { id: string; date: string } }) {
  const { id, date } = params;
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
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <Link href={`/vehicle/${id}`} className='text-gray-400 hover:text-white transition-colors'>
              ← Back to vehicle
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
