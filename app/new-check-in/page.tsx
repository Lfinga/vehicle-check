import { VehicleCheckInForm } from '../components/new-check-in/vehicle-check-in-form';
import { Sidebar } from '../components/sidebar';

export default function NewCheckIn() {
  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Vehicle Check-In</h1>
          <VehicleCheckInForm />
        </div>
      </main>
    </div>
  );
}
