import { createClient } from "../supabase/server";

export async function getUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}
