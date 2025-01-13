import { Sidebar } from '../components/sidebar';
import { StatsCards } from '../components/dashboard/stats-cards';
import { NewCheckInButton } from '../components/dashboard/new-check-in-button';

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <NewCheckInButton />
        </div>

        <StatsCards />
      </main>
    </div>
  );
}
