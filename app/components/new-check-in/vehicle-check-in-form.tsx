'use client';

import { useState } from 'react';
import Image from 'next/image';
import { uploadVehicleImages } from '@/app/driver/new-check-in/action';
import { useRouter } from 'next/navigation';

const VEHICLE_ANGLES = [
  { id: 'front-right', label: 'Front Right' },
  { id: 'front-left', label: 'Front Left' },
  { id: 'rear-right', label: 'Rear Right' },
  { id: 'rear-left', label: 'Rear Left' },
];

type Vehicle = {
  id: number;
  brand: string;
  license_plate: string;
  model: string;
  year: string;
  created_at: string;
};

type Props = {
  vehicles: Vehicle[];
  userId: string | null;
};

export default function VehicleCheckInForm({ vehicles, userId }: Props) {
  const router = useRouter();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  });

  const onImageUploadChange = (angleId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];
    if (!file.type.startsWith('image')) {
      return;
    }

    setImageFiles((prev) => ({
      ...prev,
      [angleId]: file,
    }));

    setImages((prev) => ({
      ...prev,
      [angleId]: URL.createObjectURL(file),
    }));

    // Reset the input so the same file can be selected again if needed
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle || Object.keys(images).length < 4 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await uploadVehicleImages(Number(selectedVehicle), userId!, imageFiles);
      if (result.success) {
        router.push('/admin/vehicles');
      } else {
        alert('Failed to upload images. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-[#1A1A1A] rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-white text-xl mb-2'>Select your vehicle</h2>
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          className='w-full bg-[#2A2A2A] text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value=''>Choose your vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.license_plate} - {vehicle.brand} {vehicle.model}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-6'>
        <h2 className='text-white text-xl mb-2'>Take pictures of the vehicle</h2>
        <div className='grid grid-cols-2 gap-4'>
          {VEHICLE_ANGLES.map(({ id, label }) => (
            <div key={id} className='space-y-2'>
              <span className='text-sm text-gray-300'>{label}</span>
              <div className='aspect-[4/3] relative border-2 border-dashed border-gray-600 rounded-lg overflow-hidden'>
                {images[id] ? (
                  <div className='group relative h-full'>
                    <Image src={images[id]} alt={`Vehicle ${label}`} fill className='object-cover' />
                    <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <button
                        onClick={() =>
                          setImages((prev) => {
                            const newImages = { ...prev };
                            delete newImages[id];
                            return newImages;
                          })
                        }
                        className='text-white bg-red-500 px-3 py-1 rounded-md text-sm'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='h-full'>
                    {isMobile ? (
                      <label className='flex flex-col items-center justify-center h-full cursor-pointer'>
                        <div className='p-4 text-center'>
                          <div className='w-12 h-12 mx-auto mb-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              className='text-gray-400'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                            </svg>
                          </div>
                          <span className='text-sm text-gray-400'>Take Picture or Choose File</span>
                        </div>
                        <input
                          type='file'
                          accept='image/*'
                          capture
                          className='hidden'
                          onChange={(e) => onImageUploadChange(id, e)}
                        />
                      </label>
                    ) : (
                      <>
                        <label className='flex flex-col items-center justify-center h-2/3 cursor-pointer border-b border-gray-600'>
                          <div className='p-4 text-center'>
                            <div className='w-12 h-12 mx-auto mb-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                className='text-gray-400'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                              </svg>
                            </div>
                            <span className='text-sm text-gray-400'>Take Picture</span>
                          </div>
                          <input
                            type='file'
                            accept='image/*'
                            capture='environment'
                            className='hidden'
                            onChange={(e) => onImageUploadChange(id, e)}
                          />
                        </label>
                        <label className='flex flex-col items-center justify-center h-1/3 cursor-pointer'>
                          <div className='p-2 text-center'>
                            <span className='text-sm text-gray-400'>or Upload from Device</span>
                          </div>
                          <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={(e) => onImageUploadChange(id, e)}
                          />
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedVehicle || Object.keys(images).length < 4 || isSubmitting}
        className='w-full bg-blue-800 text-white py-3 rounded-md font-medium disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors'
      >
        {isSubmitting ? 'Uploading...' : 'Complete Check-In'}
      </button>
    </div>
  );
}
