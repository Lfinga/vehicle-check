import { getUser } from '@/server/services/users';
import { Sidebar } from './sidebar';
export async function SideBarWrapper() {
  const user = await getUser();
  return <>{user && <Sidebar user={user} />}</>;
}
