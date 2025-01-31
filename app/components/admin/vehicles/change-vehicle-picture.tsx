'use client';

import { useState } from 'react';
import { updateVehiclePicture } from '@/app/admin/vehicles/action';

export default function ChangeVehiclePicture({ vehicleId }: { vehicleId: number }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await updateVehiclePicture(vehicleId, file);
      window.location.reload();
    } catch (error) {
      console.error('Error updating vehicle picture:', error);
      alert('Failed to update vehicle picture. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center group z-20 hover:bg-black/30 transition-colors'>
      <button
        className='bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all opacity-0 group-hover:opacity-100 z-30'
        onClick={() => document.getElementById('vehicle-picture-input')?.click()}
        disabled={isUploading}
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
            d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
          />
        </svg>
        {isUploading ? 'Uploading...' : 'Change Picture'}
      </button>
      <input id='vehicle-picture-input' type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
    </div>
  );
}
