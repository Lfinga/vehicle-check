import { Sidebar } from '@/app/components/sidebar';
import { getVehicleById } from '@/server/services/vehicles';
import { notFound } from 'next/navigation';
import PictureDates from '@/app/components/vehicle/picture-dates';

export default async function VehiclePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const vehicle = await getVehicleById(parseInt(id));

  if (!vehicle) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>
            {vehicle.brand} {vehicle.model}
          </h1>
          <div className='bg-gray-900/50 rounded-lg p-6 mb-8'>
            <div className='grid grid-cols-2 gap-4 text-gray-300 mb-6'>
              <div>
                <span className='text-gray-400'>License Plate:</span>
                <p className='text-lg'>{vehicle.license_plate}</p>
              </div>
              <div>
                <span className='text-gray-400'>Year:</span>
                <p className='text-lg'>{vehicle.year}</p>
              </div>
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-xl font-bold text-white mb-4'>Picture Dates</h2>
            <PictureDates vehicleId={vehicle.id} />
          </div>

          {/* <div>
            <h2 className='text-xl font-bold text-white mb-4'>Vehicle Pictures</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='aspect-video bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-400'>
                Coming soon: Vehicle pictures
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
