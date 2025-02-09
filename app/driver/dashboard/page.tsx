import { NewCheckInButton } from '@/app/components/dashboard/new-check-in-button';
import { DriverStatsCards } from '@/app/components/dashboard/driver-stats-cards';
import { getDriverStats } from './action';
import { createClient } from '@/server/supabase/server';

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className='min-h-screen bg-[#111]'>
        <main className='p-4 lg:ml-64 lg:p-8'>
          <div className='text-white'>Please log in to view your dashboard.</div>
        </main>
      </div>
    );
  }

  const stats = await getDriverStats(user.id);

  if (!stats) {
    return (
      <div className='min-h-screen bg-[#111]'>
        <main className='p-4 lg:ml-64 lg:p-8'>
          <div className='text-white'>Please log in to view your dashboard.</div>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <NewCheckInButton />
        </div>

        <DriverStatsCards totalCheckIns={stats.totalCheckIns} lastCheckInDate={stats.lastCheckIn?.created_at || null} />
      </main>
    </div>
  );
}
