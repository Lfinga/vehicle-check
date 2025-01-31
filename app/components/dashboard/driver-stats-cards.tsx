'use client';

import { CheckCircle, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className='bg-black rounded-lg p-6 text-white'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-gray-400 text-sm font-medium'>{title}</h3>
          <p className='text-4xl font-bold mt-2'>{value}</p>
          <p className='text-gray-400 text-sm mt-2'>{subtitle}</p>
        </div>
        <div className='text-gray-400'>{icon}</div>
      </div>
    </div>
  );
}

interface DriverStatsCardsProps {
  totalCheckIns: number;
  lastCheckInDate: string | null;
}

export function DriverStatsCards({ totalCheckIns, lastCheckInDate }: DriverStatsCardsProps) {
  const formatDate = (date: string | null) => {
    if (!date) return 'No check-ins yet';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <StatsCard
        title='Total Check-ins'
        value={totalCheckIns}
        subtitle='Your total vehicle check-ins'
        icon={<CheckCircle size={24} />}
      />
      <StatsCard
        title='Last Check-in'
        value={formatDate(lastCheckInDate)}
        subtitle='Your most recent check-in'
        icon={<Clock size={24} />}
      />
    </div>
  );
}
