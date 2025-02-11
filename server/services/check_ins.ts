import { createClient } from '../supabase/server'
import { Database } from '@/types/supabase'

type CheckInFilters = {
  startDate?: string
  endDate?: string
  driverId?: string
  vehicleId?: number
}

type CheckInWithDetails = Database['public']['Tables']['check_ins']['Row'] & {
  vehicles: {
    id: number
    brand: string
    model: string
    license_plate: string
  } | null
  users?: {
    id: string
    first_name: string | null
    last_name: string | null
    email: string
  } | null
}

export async function getFilteredCheckIns(filters: CheckInFilters) {
  const supabase = await createClient()
  
  let query = supabase
    .from('check_ins')
    .select(`
      *,
      users (
        id,
        first_name,
        last_name,
        email
      ),
      vehicles (
        id,
        brand,
        model,
        license_plate
      )
    `)
    .order('created_at', { ascending: false })

  if (filters.startDate) {
    query = query.gte('created_at', filters.startDate)
  }

  if (filters.endDate) {
    query = query.lte('created_at', filters.endDate)
  }

  if (filters.driverId) {
    query = query.eq('driver_id', filters.driverId)
  }

  if (filters.vehicleId) {
    query = query.eq('vehicle_id', filters.vehicleId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching check-ins:', error)
    throw error
  }

  return data
}

export async function getCheckInById(id: number, driverId?: string): Promise<CheckInWithDetails | null> {
  const supabase = await createClient()

  let query = supabase
    .from('check_ins')
    .select(
      `
      *,
      vehicles (
        id,
        brand,
        model,
        license_plate
      ),
      users (
        id,
        first_name,
        last_name,
        email
      )
    `
    )
    .eq('id', id)

  if (driverId) {
    query = query.eq('driver_id', driverId)
  }

  const { data: checkIn, error } = await query.single()

  if (error) {
    console.error('Error fetching check-in:', error)
    return null
  }

  return checkIn
}

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
    lastCheckIn: lastCheckIn,
  }
}