'use server'

import { createClient } from '@/server/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addVehicle(formData: FormData) {
  const supabase = await createClient()

  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const year = formData.get('year') as string
  const color = formData.get('color') as string
  const licensePlate = formData.get('licensePlate') as string
  const vehiclePicture = formData.get('vehiclePicture') as File

  if (!brand || !model || !year || !color || !licensePlate) {
    throw new Error('Missing required fields')
  }


  // Upload vehicle picture if provided
  if (vehiclePicture && vehiclePicture.size > 0) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('vehicules_pictures')
      .upload(`main/${licensePlate}/${vehiclePicture.name}`, vehiclePicture)

    if (uploadError) {
      throw new Error('Error uploading vehicle picture')
    }

    
    console.log(uploadData.fullPath)
    
    const { error } = await supabase
      .from('vehicles')
      .insert({
        brand,
        model,
        year,
        color,
        license_plate: licensePlate,
        vehicle_picture_url: `https://lsehxbtdvpvpnlfwmvsq.supabase.co/storage/v1/object/public/${uploadData.fullPath}`	,
      })
      if (error) {
        throw new Error('Error adding vehicle')
      }
  }



  revalidatePath('/admin/vehicles')
  redirect('/admin/vehicles')
} 