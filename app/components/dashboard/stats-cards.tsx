import { Car, Clock, CheckCircle } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
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

export function StatsCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <StatsCard title='Total Check-ins' value={0} subtitle='+20.1% from last month' icon={<CheckCircle size={24} />} />
      <StatsCard title='Active Vehicles' value={0} subtitle='+2 new vehicles this week' icon={<Car size={24} />} />
      <StatsCard title='Recent Check-ins' value={0} subtitle='In the last 24 hours' icon={<Clock size={24} />} />
    </div>
  );
}
