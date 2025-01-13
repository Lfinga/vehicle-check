import { Sidebar } from '../components/sidebar';
import { SearchBar } from '../components/vehicle-history/search-bar';
import { VehicleList } from '../components/vehicle-history/vehicle-list';

export default function VehicleHistory() {
  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Vehicle History</h1>
          <SearchBar />
          <VehicleList />
        </div>
      </main>
    </div>
  );
}
