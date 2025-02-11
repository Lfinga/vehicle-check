import { getAllDrivers } from '@/server/services/users';
import SearchBar from '@/app/components/admin/drivers/search-bar';
import DriversList from '@/app/components/admin/drivers/drivers-list';

export default async function DriversPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = ((await searchParams).query as string) || '';
  const drivers = await getAllDrivers(query);

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Drivers</h1>
          <SearchBar />
        </div>
        <DriversList drivers={drivers} />
      </main>
    </div>
  );
}
