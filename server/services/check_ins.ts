import { createClient } from '../supabase/server'

type CheckInFilters = {
  startDate?: string
  endDate?: string
  driverId?: string
  vehicleId?: number
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