import { getPictureDatesForVehicle } from '@/server/services/pictures';
import Link from 'next/link';

export default async function PictureDates({ vehicleId }: { vehicleId: number }) {
  const dates = await getPictureDatesForVehicle(vehicleId);

  if (dates.length === 0) {
    return <div className='text-gray-400 text-center py-4'>No pictures available for this vehicle</div>;
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {dates.map((date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return (
          <Link
            key={date}
            href={`/vehicle/${vehicleId}/pictures/${date}`}
            className='block p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors'
          >
            <time dateTime={date} className='text-gray-300 text-sm'>
              {formattedDate}
            </time>
          </Link>
        );
      })}
    </div>
  );
}
