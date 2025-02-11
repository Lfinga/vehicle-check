'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createDriver } from '@/app/admin/drivers/action';

export default function NewDriverForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await createDriver(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push('/admin/drivers');
    }
  }

  return (
    <form action={handleSubmit} className='space-y-6 max-w-md'>
      {error && <div className='bg-red-50 text-red-500 p-4 rounded-md'>{error}</div>}

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-white'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          required
          className='mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2'
          placeholder='driver@example.com'
        />
      </div>

      <div>
        <label htmlFor='firstName' className='block text-sm font-medium text-white'>
          First Name
        </label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          className='mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2'
          placeholder='John'
        />
      </div>

      <div>
        <label htmlFor='lastName' className='block text-sm font-medium text-white'>
          Last Name
        </label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          className='mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2'
          placeholder='Doe'
        />
      </div>

      <div className='flex items-center justify-end gap-4'>
        <button
          type='button'
          onClick={() => router.push('/admin/drivers')}
          className='px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded-md transition-colors'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {isLoading ? 'Creating...' : 'Create Driver'}
        </button>
      </div>
    </form>
  );
}
