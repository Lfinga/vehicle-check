import { Sidebar } from '../components/sidebar';
import { getUser } from '@/server/services/users';
import { redirect } from 'next/navigation';

export default async function NewCheckIn() {
  const user = await getUser();

  // Redirect to login if no user
  if (!user) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-[#111]'>
      <Sidebar />

      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Vehicle Check-In</h1>
        </div>
      </main>
    </div>
  );
}
