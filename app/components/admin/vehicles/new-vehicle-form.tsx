'use client';

import { addVehicle } from '@/app/admin/vehicles/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewVehicleForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);
      setError(null);
      await addVehicle(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className='space-y-6 max-w-2xl'>
      <div className='bg-[#222] rounded-lg p-6 space-y-6'>
        <div>
          <label htmlFor='brand' className='block text-sm font-medium text-gray-200'>
            Brand
          </label>
          <input
            type='text'
            name='brand'
            id='brand'
            required
            className='mt-1 block w-full rounded-md border border-gray-600 bg-[#333] px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label htmlFor='model' className='block text-sm font-medium text-gray-200'>
            Model
          </label>
          <input
            type='text'
            name='model'
            id='model'
            required
            className='mt-1 block w-full rounded-md border border-gray-600 bg-[#333] px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label htmlFor='year' className='block text-sm font-medium text-gray-200'>
            Year
          </label>
          <input
            type='text'
            name='year'
            id='year'
            required
            pattern='\\d{4}'
            className='mt-1 block w-full rounded-md border border-gray-600 bg-[#333] px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label htmlFor='color' className='block text-sm font-medium text-gray-200'>
            Color
          </label>
          <input
            type='text'
            name='color'
            id='color'
            required
            className='mt-1 block w-full rounded-md border border-gray-600 bg-[#333] px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label htmlFor='licensePlate' className='block text-sm font-medium text-gray-200'>
            License Plate
          </label>
          <input
            type='text'
            name='licensePlate'
            id='licensePlate'
            required
            className='mt-1 block w-full rounded-md border border-gray-600 bg-[#333] px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label htmlFor='vehiclePicture' className='block text-sm font-medium text-gray-200'>
            Vehicle Picture
          </label>
          <input
            type='file'
            name='vehiclePicture'
            id='vehiclePicture'
            accept='image/*'
            className='mt-1 block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700'
          />
        </div>
      </div>

      {error && <div className='text-red-500 text-sm mt-4'>{error}</div>}

      <div className='flex justify-end gap-4 mt-6'>
        <button
          type='button'
          onClick={() => router.back()}
          className='px-4 py-2 text-sm font-medium text-gray-200 bg-[#333] border border-gray-600 rounded-md shadow-sm hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={loading}
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Adding...' : 'Add Vehicle'}
        </button>
      </div>
    </form>
  );
}
