'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteDriver } from '@/app/admin/drivers/action';

interface DeleteDriverButtonProps {
  driverId: string;
  driverName: string;
  onDeleted?: () => void;
}

export default function DeleteDriverButton({ driverId, driverName, onDeleted }: DeleteDriverButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);

    const result = await deleteDriver(driverId);

    if (result.error) {
      setError(result.error);
      setIsDeleting(false);
      setShowConfirm(false);
    } else {
      onDeleted?.();
      setShowConfirm(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className='inline-flex items-center p-1 text-red-500 hover:text-red-700 transition-colors'
        title='Delete driver'
      >
        <TrashIcon className='h-5 w-5' />
      </button>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700'>
            <h3 className='text-xl font-semibold text-white mb-4'>Delete Driver</h3>
            <p className='text-gray-300 mb-6'>
              Are you sure you want to delete {driverName}? This action cannot be undone.
            </p>

            {error && (
              <div className='mb-4 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200'>{error}</div>
            )}

            <div className='flex justify-end gap-4'>
              <button
                type='button'
                onClick={() => setShowConfirm(false)}
                className='px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded-md transition-colors'
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleDelete}
                disabled={isDeleting}
                className='px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
