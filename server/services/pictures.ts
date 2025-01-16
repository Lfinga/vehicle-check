import { Database } from "@/types/supabase";
import { createClient } from "../supabase/client";

const supabase = createClient();

export async function uploadPicture(file: File, photoId: string, carId: number, userId: string, angle: Database['public']['Enums']['angle'], previewUrl: string) {
  try {
    // Upload file to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('vehicules_pictures')
      .upload(`${photoId}.png`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (storageError) {
      throw storageError;
    }

    // Store metadata in database with numeric ID
    console.log('carId', carId);
    const { error: dbError } = await supabase
      .from('pictures')
      .insert({
        bucket_picture_id: photoId,
        vehicule_id: carId,
        user_id: userId,
        angle: angle,
        picture_url: previewUrl
      });

    if (dbError) {
      // If database insert fails, try to delete the uploaded file
      await supabase.storage
        .from('vehicules_pictures')
        .remove([`${photoId}.png`]);
      throw dbError;
    }

    return storageData;
  } catch (error) {
    console.error('Error uploading picture:', error);
    throw error;
  }
}

export async function getPicturesByCarId(carId: number) {
  try {
    const { data, error } = await supabase
      .from('pictures')
      .select('*')
      .eq('vehicule_id', carId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Get signed URLs for each picture
    const picturesWithUrls = await Promise.all(
      data.map(async (picture) => {
        const { data: { publicUrl } } = supabase.storage
          .from('vehicules_pictures')
          .getPublicUrl(`${picture.id}.png`);

        return {
          ...picture,
          url: publicUrl
        };
      })
    );

    return picturesWithUrls;
  } catch (error) {
    console.error('Error fetching pictures by car ID:', error);
    throw error;
  }
}

export async function getPicturesByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from('pictures')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Get signed URLs for each picture
    const picturesWithUrls = await Promise.all(
      data.map(async (picture) => {
        const { data: { publicUrl } } = supabase.storage
          .from('vehicules_pictures')
          .getPublicUrl(`${picture.id}.png`);

        return {
          ...picture,
          url: publicUrl
        };
      })
    );

    return picturesWithUrls;
  } catch (error) {
    console.error('Error fetching pictures by user ID:', error);
    throw error;
  }
}

export async function getPicturesByCarAndAngle(carId: number, angle: Database['public']['Enums']['angle']) {
  try {
    const { data, error } = await supabase
      .from('pictures')
      .select('*')
      .eq('vehicule_id', carId)
      .eq('angle', angle)
      .order('created_at', { ascending: false })
      .limit(1); // Get the most recent picture for this angle

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    // Get signed URL for the picture
    const picture = data[0];
    const { data: { publicUrl } } = supabase.storage
      .from('vehicules_pictures')
      .getPublicUrl(`${picture.id}.png`);

    return {
      ...picture,
      url: publicUrl
    };
  } catch (error) {
    console.error('Error fetching picture by car ID and angle:', error);
    throw error;
  }
}

