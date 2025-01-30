import { createClient } from '@/server/supabase/server';
import { redirect } from 'next/navigation';
import NewVehicleForm from '@/app/components/admin/vehicles/new-vehicle-form';
import { Sidebar } from '@/app/components/sidebar';

export default async function NewVehiclePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: userData } = await supabase.from('users').select('is_admin').eq('id', user.id).single();
  console.log(userData);
  if (!userData?.is_admin) {
    redirect('/dashboard');
  }

  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-8'>Add New Vehicle</h1>
          <NewVehicleForm />
        </div>
      </main>
    </div>
  );
}
