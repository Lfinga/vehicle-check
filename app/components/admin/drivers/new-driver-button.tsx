'use client';

import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function NewDriverButton() {
  return (
    <Link
      href='/admin/drivers/new'
      className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors'
    >
      <PlusIcon className='h-5 w-5 mr-2' />
      Add New Driver
    </Link>
  );
}
