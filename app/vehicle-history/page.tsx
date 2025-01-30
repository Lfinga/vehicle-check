import { Sidebar } from '../components/sidebar';
import { SearchBar } from '../components/vehicle-history/search-bar';
import VehicleListContainer from '../components/vehicle-history/vehicle-list-container';

interface SearchParams {
  query?: string;
}

export default function VehicleHistory({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.query;

  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Vehicle History</h1>
          <SearchBar />
          <div className='mt-6'>
            <VehicleListContainer query={query} />
          </div>
        </div>
      </main>
    </div>
  );
}
