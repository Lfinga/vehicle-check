import { getFilteredCheckIns } from '@/server/services/check_ins';
import { getAllVehicles } from '@/server/services/vehicles';
import { getUser } from '@/server/services/users';
import CheckInFilters from '@/app/components/admin/drivers/check-in-filters';
import CheckInsList from '@/app/components/admin/drivers/check-ins-list';
import WeekNavigation from '@/app/components/vehicle/week-navigation';
import { startOfWeek, endOfWeek } from 'date-fns';

export default async function DriverCheckInsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { startDate, endDate, vehicleId, weekStart } = (await searchParams) as {
    startDate?: string;
    endDate?: string;
    vehicleId?: string;
    weekStart?: string;
  };

  const user = await getUser();
  const vehicles = await getAllVehicles();

  // If no week is selected, use current week's dates
  const effectiveStartDate =
    startDate || weekStart || startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString().split('T')[0];
  const effectiveEndDate =
    endDate ||
    (weekStart
      ? endOfWeek(new Date(weekStart), { weekStartsOn: 1 }).toISOString().split('T')[0]
      : endOfWeek(new Date(), { weekStartsOn: 1 }).toISOString().split('T')[0]);

  const checkIns = await getFilteredCheckIns({
    driverId: user?.id,
    startDate: effectiveStartDate,
    endDate: effectiveEndDate,
    vehicleId: vehicleId ? parseInt(vehicleId) : undefined,
  });

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>My Check-ins History</h1>
          <WeekNavigation />
          <CheckInFilters vehicles={vehicles} />
          <CheckInsList checkIns={checkIns} />
        </div>
      </main>
    </div>
  );
}
