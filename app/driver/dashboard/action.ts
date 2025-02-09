'use server'

import { createClient } from '@/server/supabase/server'

export async function getDriverStats(userId: string) {
  const supabase = await createClient()


  // Get total check-ins for the driver
  const { count: totalCheckIns } = await supabase
    .from('check_ins')
    .select('*', { count: 'exact', head: true })
    .eq('driver_id', userId)


  // Get vehicles checked by this driver
  const { data: vehicles } = await supabase
    .from('check_ins')
    .select('vehicle_id')
    .eq('driver_id', userId)


  // Get last check-in
  const { data: lastCheckIn } = await supabase
    .from('check_ins')
    .select('*, vehicles(*)')
    .eq('driver_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()


  return {
    totalCheckIns: totalCheckIns! || 0,
    uniqueVehicles: vehicles?.length || 0,
    lastCheckIn: lastCheckIn
  }

}