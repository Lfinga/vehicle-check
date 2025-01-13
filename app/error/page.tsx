'use client';

import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Oops! Something went wrong</h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          There was an error processing your request. This could be due to invalid credentials or a connection issue.
        </p>
        <button
          onClick={() => router.push('/login')}
          className='mt-4 w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
