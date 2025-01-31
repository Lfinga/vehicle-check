import { getPictureDatesForVehicle } from '@/server/services/pictures';
import Link from 'next/link';

export default async function PictureDates({ vehicleId }: { vehicleId: number }) {
  const dates = await getPictureDatesForVehicle(vehicleId);

  if (dates.length === 0) {
    return <div className='text-gray-400 text-center py-4'>No pictures available for this vehicle</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {dates.map((dateInfo) => {
        const formattedDate = new Date(dateInfo.date).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return (
          <Link
            key={dateInfo.date}
            href={`/admin/vehicles/${vehicleId}/pictures/${dateInfo.date}`}
            className='block p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors'
          >
            <div className='flex flex-col gap-1'>
              <time dateTime={dateInfo.date} className='text-gray-300 text-sm'>
                {formattedDate}
              </time>
              <span className='text-xs text-gray-400'>Driver: {dateInfo.driver_name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
