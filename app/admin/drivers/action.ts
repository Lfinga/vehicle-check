'use server';

import { createAdminClient } from '@/server/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createDriver(formData: FormData) {
  try {
    const supabase = createAdminClient();
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    if (!email) {
      return {
        error: 'Email is required'
      };
    }

    // Create auth user first
    const { error: authError } = await supabase.auth.admin.createUser({
      email,
      password: email, // Initially set password same as email, user will need to reset it
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        is_admin: false
      }
    });

    if (authError) {
      return {
        error: authError.message
      };
    }

    revalidatePath('/admin/drivers');
    return { success: true };
  } catch (error) {
    console.error('Error creating driver:', error);
    return {
      error: 'An unexpected error occurred'
    };
  }
}

export async function deleteDriver(driverId: string) {
  try {
    const supabase = createAdminClient();

    // Delete the user from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(driverId);

    if (authError) {
      return {
        error: authError.message
      };
    }

    revalidatePath('/admin/drivers');
    return { success: true };
  } catch (error) {
    console.error('Error deleting driver:', error);
    return {
      error: 'An unexpected error occurred'
    };
  }
}