import { createClient } from "../supabase/server";

export async function getUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user) {
      return null;
    }
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user!.id)
      .single();


    if (error) {
      throw error;
    }

    return userData;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function getAllDrivers(query?: string) {
  const supabase = await createClient();
  
  let driversQuery = supabase
    .from('users')
    .select('*').eq('is_admin',false)
    .order('first_name', { ascending: true });
  
  if (query) {
    driversQuery = driversQuery.or(
      `first_name.ilike.%${query}%,` +
      `last_name.ilike.%${query}%,` +
      `email.ilike.%${query}%`
    );
  }

  const { data: drivers, error } = await driversQuery;

  if (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }

  return drivers;
}
