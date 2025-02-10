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

    return { ...userData };
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}
