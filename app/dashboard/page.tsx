import { Sidebar } from '../components/sidebar';
import { NewCheckInButton } from '../components/dashboard/new-check-in-button';
import { DriverStatsCards } from '../components/dashboard/driver-stats-cards';
import { getDriverStats } from './action';

export default async function Dashboard() {
  const stats = await getDriverStats();

  if (!stats) {
    return (
      <div className='min-h-screen bg-[#111]'>
        <Sidebar />
        <main className='p-4 lg:ml-64 lg:p-8'>
          <div className='text-white'>Please log in to view your dashboard.</div>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <NewCheckInButton />
        </div>

        <DriverStatsCards totalCheckIns={stats.totalCheckIns} lastCheckInDate={stats.lastCheckInDate} />
      </main>
    </div>
  );
}
