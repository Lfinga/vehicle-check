'use server';

import { createClient } from '@/server/supabase/server';
import { revalidatePath } from 'next/cache';

type Angle = 'front-right' | 'front-left' | 'rear-right' | 'rear-left';

export async function uploadVehicleImages(vehicleId: number,userId: string, images: { [key: string]: File }) {
  try {
    const supabase = await createClient();

    for (const [angle, file] of Object.entries(images)) {
      // Upload to storage bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('vehicules_pictures')
        .upload(`${vehicleId}/${angle}-${Date.now()}`, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw uploadError;
      }

      // Store reference in pictures table
      const { error: dbError } = await supabase.from('pictures').insert({
        user_id: userId,
        vehicule_id: vehicleId,
        angle: angle as Angle,
        bucket_picture_id: uploadData.path,
      });

      if (dbError) {
        console.error('Error storing picture reference:', dbError);
        throw dbError;
      }
    }

    revalidatePath('/vehicle-history');
    return { success: true };
  } catch (error) {
    console.error('Error in uploadVehicleImages:', error);
    return { success: false, error };
  }
}


