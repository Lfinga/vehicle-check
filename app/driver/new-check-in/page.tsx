import { getUser } from '@/server/services/users';
// import { redirect } from 'next/navigation';
import VehicleCheckInForm from '../../components/new-check-in/vehicle-check-in-form';
import { getAllVehicles } from '@/server/services/vehicles';

export default async function NewCheckIn() {
  const user = await getUser();
  const vehicles = await getAllVehicles();

  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Driver Vehicle Check-In</h1>
          <VehicleCheckInForm vehicles={vehicles} userId={user!.id} />
        </div>
      </main>
    </div>
  );
}
