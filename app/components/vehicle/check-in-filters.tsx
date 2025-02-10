'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CheckInFilters() {
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

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(pathname + '?' + createQueryString([{ name: 'driver', value: e.target.value }]));
  };

  const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
    <div className='relative'>
      <input
        type='text'
        value={value}
        onClick={onClick}
        readOnly
        placeholder='Select date range'
        className='w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
      />
      <button
        onClick={onClick}
        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
          />
        </svg>
      </button>
    </div>
  );

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
            customInput={<CustomInput />}
            wrapperClassName='w-full'
            calendarClassName='!bg-gray-900 !text-white !border-gray-700'
            dayClassName={(date) =>
              'hover:!bg-blue-500 hover:!text-white ' +
              (date.toDateString() === new Date().toDateString() ? '!bg-blue-500 !text-white' : '')
            }
          />
        </div>
      </div>
      <div className='flex-1'>
        <label htmlFor='driver' className='block text-sm font-medium text-gray-300 mb-2'>
          Filter by Driver
        </label>
        <input
          type='text'
          id='driver'
          name='driver'
          placeholder='Search by driver name'
          defaultValue={searchParams.get('driver') || ''}
          onChange={handleDriverChange}
          className='w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
    </div>
  );
}
