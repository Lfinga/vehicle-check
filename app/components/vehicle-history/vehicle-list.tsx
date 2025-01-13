'use client';

import { Calendar, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  checkInDate: string;
  status: 'active' | 'completed';
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className='bg-black/40 rounded-lg p-6 hover:bg-black/60 transition-colors'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='text-white font-medium'>{vehicle.licensePlate}</h3>
          <p className='text-gray-400 text-sm mt-1'>
            {vehicle.make} {vehicle.model}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            vehicle.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'
          }`}
        >
          {vehicle.status}
        </span>
      </div>

      <div className='flex items-center space-x-4 text-gray-400 text-sm'>
        <div className='flex items-center space-x-2'>
          <Calendar size={16} />
          <span>{vehicle.checkInDate}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Clock size={16} />
          <span>2 hours ago</span>
        </div>
      </div>
    </div>
  );
}

// Sample vehicle data - replace with your actual data
const ALL_VEHICLES: Vehicle[] = [
  {
    id: '1',
    licensePlate: 'ABC 123',
    make: 'Toyota',
    model: 'Camry',
    checkInDate: '2024-01-20',
    status: 'active',
  },
  {
    id: '2',
    licensePlate: 'XYZ 789',
    make: 'Honda',
    model: 'Civic',
    checkInDate: '2024-01-19',
    status: 'completed',
  },
  {
    id: '3',
    licensePlate: 'DEF 456',
    make: 'Toyota',
    model: 'Corolla',
    checkInDate: '2024-01-21',
    status: 'active',
  },
  {
    id: '4',
    licensePlate: 'GHI 789',
    make: 'Honda',
    model: 'Accord',
    checkInDate: '2024-01-18',
    status: 'completed',
  },
];

export function VehicleList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  // Filter vehicles based on search query
  const filteredVehicles = ALL_VEHICLES.filter((vehicle) => {
    if (!searchQuery) return true;

    const searchTerms = searchQuery.split(' ');
    return searchTerms.every(
      (term) =>
        vehicle.make.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.licensePlate.toLowerCase().replace(/\s/g, '').includes(term)
    );
  });

  if (filteredVehicles.length === 0) {
    return (
      <div className='text-center text-gray-400 mt-8'>
        <p>No vehicles found matching your search.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {filteredVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
