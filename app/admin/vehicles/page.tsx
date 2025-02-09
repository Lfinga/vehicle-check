import { SearchBar } from '../../components/vehicle-history/search-bar';
import VehicleListContainer from '../../components/vehicle-history/vehicle-list-container';
import Link from 'next/link';
import { createClient } from '@/server/supabase/server';
import { redirect } from 'next/navigation';

export default async function VehicleHistory({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;

  // Check if user is admin
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userData } = await supabase.from('users').select('is_admin').eq('id', user.id).single();

  if (!userData?.is_admin) {
    redirect('/dashboard');
  }

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-3xl font-bold text-white'>Vehicle History</h1>
            <Link
              href='/admin/vehicles/new'
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Add New Vehicle
            </Link>
          </div>
          <SearchBar />
          <div className='mt-6'>
            <VehicleListContainer query={query} />
          </div>
        </div>
      </main>
    </div>
  );
}
