import { getAllDrivers } from '@/server/services/users';
import SearchBar from '@/app/components/admin/drivers/search-bar';
import DriversList from '@/app/components/admin/drivers/drivers-list';
import NewDriverButton from '@/app/components/admin/drivers/new-driver-button';

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
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-3xl font-bold text-white'>Drivers</h1>
            <NewDriverButton />
          </div>
          <SearchBar />
        </div>
        <DriversList drivers={drivers} />
      </main>
    </div>
  );
}
