import { redirect } from 'next/navigation';
import { getUser } from '@/server/services/users';

export default async function Home() {
  const user = await getUser();
  if (user?.is_admin) {
    redirect('/admin/dashboard');
  } else {
    redirect('/driver/dashboard');
  }
  return <div>Home</div>;
}
