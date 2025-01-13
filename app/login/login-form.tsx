'use client';

import { login, signup } from './action';

export default function LoginForm() {
  return (
    <form className='mt-8 space-y-6'>
      <div className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
            placeholder='Enter your email'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            className='appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
            placeholder='Enter your password'
          />
        </div>
      </div>

      <div className='flex flex-col space-y-3'>
        <button
          formAction={login}
          className='group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
        >
          Sign in
        </button>
        <button
          formAction={signup}
          className='group relative w-full flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
        >
          Create account
        </button>
      </div>
    </form>
  );
}
