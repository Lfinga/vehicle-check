import { Sidebar } from '@/app/components/sidebar';
import { getVehicleById } from '@/server/services/vehicles';
import { notFound } from 'next/navigation';
import PictureDates from '@/app/components/vehicle/picture-dates';
import Link from 'next/link';
import Image from 'next/image';
import ChangeVehiclePicture from '@/app/components/admin/vehicles/change-vehicle-picture';

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
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
          <div className='flex items-center gap-4 mb-6'>
            <Link
              href='/admin/vehicles'
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
              Back to Vehicles
            </Link>
          </div>

          <div className='bg-gray-900/50 rounded-lg overflow-hidden mb-8'>
            <div className='relative aspect-[21/9] w-full'>
              {vehicle.vehicle_picture_url ? (
                <>
                  <Image
                    src={vehicle.vehicle_picture_url}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className='object-cover'
                    priority
                    sizes='(max-width: 1280px) 100vw, 1280px'
                  />
                  <ChangeVehiclePicture vehicleId={vehicle.id} />
                </>
              ) : (
                <div className='relative inset-0 flex items-center justify-center bg-gray-800/50 text-gray-400 aspect-[21/9] w-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-16 h-16'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                    />
                  </svg>
                  <ChangeVehiclePicture vehicleId={vehicle.id} />
                </div>
              )}
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent'>
                <div className='absolute bottom-0 left-0 right-0 p-6'>
                  <h1 className='text-4xl font-bold text-white mb-2'>
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <div className='flex items-center gap-4 text-gray-300'>
                    <div className='flex items-center gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z'
                        />
                      </svg>
                      <span>{vehicle.license_plate}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
                        />
                      </svg>
                      <span>{vehicle.year}</span>
                    </div>
                  </div>
                </div>
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
