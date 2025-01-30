import { createAdminClient } from '../server/supabase/admin';
import { Database } from '../types/supabase';

type VehicleInsert = Database['public']['Tables']['vehicles']['Insert'];

const VEHICLES_DATA: VehicleInsert[] = [
  { license_plate: 'ABC-123', brand: 'Toyota', model: 'Camry', year: '2022', color: 'Red' },
  { license_plate: 'XYZ-789', brand: 'Honda', model: 'Civic', year: '2023', color: 'Blue' },
  { license_plate: 'DEF-456', brand: 'Ford', model: 'Mustang', year: '2021', color: 'Green' },
  { license_plate: 'GHI-789', brand: 'Tesla', model: 'Model 3', year: '2023', color: 'Black' },
  { license_plate: 'JKL-012', brand: 'BMW', model: 'X5', year: '2022', color: 'White' },
  { license_plate: 'MNO-345', brand: 'Mercedes', model: 'C-Class', year: '2023', color: 'Silver' },
  { license_plate: 'PQR-678', brand: 'Audi', model: 'A4', year: '2022', color: 'Red' },
  { license_plate: 'STU-901', brand: 'Volkswagen', model: 'Golf', year: '2021', color: 'White' },
  { license_plate: 'VWX-234', brand: 'Hyundai', model: 'Tucson', year: '2023', color: 'Blue' },
  { license_plate: 'YZA-567', brand: 'Kia', model: 'Sportage', year: '2022', color: 'Green' },
];

async function seedVehicles() {
  try {
    console.log('Starting to seed vehicles...');
    
    const supabase = createAdminClient();

    // First, check if we already have vehicles to avoid duplicates
    const { data: existingVehicles, error: fetchError } = await supabase
      .from('vehicles')
      .select('license_plate');

    if (fetchError) {
      throw new Error(`Error checking existing vehicles: ${fetchError.message}`);
    }

    if (!existingVehicles) {
      throw new Error('Failed to fetch existing vehicles');
    }

    const existingPlates = new Set(existingVehicles.map(vehicle => vehicle.license_plate));
    const vehiclesToInsert = VEHICLES_DATA.filter(vehicle => !existingPlates.has(vehicle.license_plate));

    if (vehiclesToInsert.length === 0) {
      console.log('No new vehicles to insert. Database already contains all sample vehicles.');
      return;
    }

    console.log(`Inserting ${vehiclesToInsert.length} new vehicles...`);
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehiclesToInsert)
      .select();

    if (error) {
      throw new Error(`Error inserting vehicles: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned after insertion');
    }

    console.log('Successfully seeded vehicles:');
    console.table(data);
  } catch (error) {
    console.error('Failed to seed vehicles:', error);
    process.exit(1);
  }
}

// Run the seed function
seedVehicles()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 