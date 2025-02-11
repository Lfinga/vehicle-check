'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Database } from '@/types/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface CheckInFiltersProps {
  vehicles: Vehicle[];
}

export default function CheckInFilters({ vehicles }: CheckInFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | null>(
    searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null
  );

  const createQueryString = useCallback(
    (updates: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams);
      updates.forEach(({ name, value }) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    router.push(
      pathname +
        '?' +
        createQueryString([
          { name: 'startDate', value: start ? start.toISOString().split('T')[0] : '' },
          { name: 'endDate', value: end ? end.toISOString().split('T')[0] : '' },
        ])
    );
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + '?' + createQueryString([{ name: 'vehicleId', value: e.target.value }]));
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4 mb-6'>
      <div className='flex-1'>
        <label className='block text-sm font-medium text-gray-300 mb-2'>Filter by Date Range</label>
        <div className='relative z-30'>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            isClearable
            dateFormat='MMM d, yyyy'
            placeholderText='Select date range'
            className='w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>
      <div className='flex-1'>
        <label htmlFor='vehicle' className='block text-sm font-medium text-gray-300 mb-2'>
          Filter by Vehicle
        </label>
        <select
          id='vehicle'
          name='vehicle'
          defaultValue={searchParams.get('vehicleId') || ''}
          onChange={handleVehicleChange}
          className='w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value=''>All vehicles</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.brand} {vehicle.model} - {vehicle.license_plate}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
