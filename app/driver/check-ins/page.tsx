import { getFilteredCheckIns } from '@/server/services/check_ins';
import { getAllVehicles } from '@/server/services/vehicles';
import { getUser } from '@/server/services/users';
import CheckInFilters from '@/app/components/admin/drivers/check-in-filters';
import CheckInsList from '@/app/components/admin/drivers/check-ins-list';

export default async function DriverCheckInsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { startDate, endDate, vehicleId } = (await searchParams) as {
    startDate?: string;
    endDate?: string;
    vehicleId?: string;
  };

  const user = await getUser();
  const vehicles = await getAllVehicles();

  const checkIns = await getFilteredCheckIns({
    driverId: user?.id,
    startDate,
    endDate,
    vehicleId: vehicleId ? parseInt(vehicleId) : undefined,
  });

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>My Check-ins History</h1>
          <CheckInFilters vehicles={vehicles} />
          <CheckInsList checkIns={checkIns} />
        </div>
      </main>
    </div>
  );
}
