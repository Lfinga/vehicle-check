'use client';

import { startOfWeek, addDays, format, parse, isSameDay } from 'date-fns';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function WeekNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current week's start date
  const currentWeekStartDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  // Parse the weekStart date string or use current date
  const selectedWeekStart = (() => {
    const weekStartParam = searchParams.get('weekStart');
    if (weekStartParam) {
      // Parse the date string in yyyy-MM-dd format
      return parse(weekStartParam, 'yyyy-MM-dd', new Date());
    }
    // Get start of current week
    return currentWeekStartDate;
  })();

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

  const navigateToWeek = (offset: number) => {
    // Calculate new dates ensuring we preserve the exact week boundaries
    const newWeekStart = addDays(selectedWeekStart, offset * 7);
    const newWeekEnd = addDays(newWeekStart, 6);

    // Format dates consistently in yyyy-MM-dd format
    const formattedStart = format(newWeekStart, 'yyyy-MM-dd');
    const formattedEnd = format(newWeekEnd, 'yyyy-MM-dd');

    router.push(
      pathname +
        '?' +
        createQueryString([
          { name: 'weekStart', value: formattedStart },
          { name: 'startDate', value: formattedStart },
          { name: 'endDate', value: formattedEnd },
        ])
    );
  };

  // Calculate the week end date
  const weekEnd = addDays(selectedWeekStart, 6);

  // Format dates for display
  const weekStartFormatted = format(selectedWeekStart, 'MMM d, yyyy');
  const weekEndFormatted = format(weekEnd, 'MMM d, yyyy');

  // Check if we're in the current week
  const isCurrentWeek = isSameDay(selectedWeekStart, currentWeekStartDate);

  return (
    <div className='flex items-center justify-between mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700'>
      <button
        onClick={() => navigateToWeek(-1)}
        className='flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
        Previous Week
      </button>

      <div className='text-white font-medium'>
        {weekStartFormatted} - {weekEndFormatted}
      </div>

      <button
        onClick={() => navigateToWeek(1)}
        disabled={isCurrentWeek}
        className={`flex items-center gap-2 transition-colors ${
          isCurrentWeek ? 'text-gray-500 cursor-not-allowed' : 'text-blue-500 hover:text-blue-400'
        }`}
      >
        Next Week
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </button>
    </div>
  );
}
