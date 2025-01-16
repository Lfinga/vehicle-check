'use server';

import { getAllVehicles } from '@/server/services/vehicles';

export async function getVehicles() {
  try {
    const vehicles = await getAllVehicles();
    console.log('vehicles', vehicles);
    return { vehicles };
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return { error: 'Failed to fetch vehicles' };
  }
} 