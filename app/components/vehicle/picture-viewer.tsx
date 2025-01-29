'use client';

import { Database } from '@/types/supabase';
import Image from 'next/image';
import { useState } from 'react';

type Picture = Database['public']['Tables']['pictures']['Row'];

export default function PictureViewer({
  pictures,
  vehicle,
}: {
  pictures: Picture[];
  vehicle: { brand: string; model: string };
}) {
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {pictures.map((picture) => (
          <div
            key={picture.id}
            className='aspect-video relative bg-gray-900/50 rounded-lg overflow-hidden group cursor-pointer'
            onClick={() => setSelectedPicture(picture)}
          >
            {picture.picture_url && (
              <>
                <Image
                  src={picture.picture_url}
                  alt={picture.description || `${vehicle.brand} ${vehicle.model} picture`}
                  fill
                  className='object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                  sizes='(max-width: 500px) 100vw, (max-width: 500px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                {picture.description && (
                  <div className='absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm'>{picture.description}</p>
                  </div>
                )}
                <div className='absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white translate-x-full group-hover:translate-x-0 transition-transform duration-300'>
                  {picture.angle || 'No angle specified'}
                </div>
                <div className='absolute inset-0 ring-2 ring-white/0 group-hover:ring-white/20 transition-all duration-300' />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Full-screen viewer */}
      {selectedPicture && selectedPicture.picture_url && (
        <div
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in'
          onClick={() => setSelectedPicture(null)}
        >
          <button
            onClick={() => setSelectedPicture(null)}
            className='absolute top-4 right-4 text-white hover:text-gray-300 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>

          <div className='relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center animate-scale-in'>
            <div className='relative w-full h-full'>
              <Image
                src={selectedPicture.picture_url}
                alt={selectedPicture.description || `${vehicle.brand} ${vehicle.model} picture`}
                fill
                className='object-contain'
                sizes='100vw'
                priority
              />
            </div>
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up'>
              <div className='px-3 py-1.5 bg-black/80 rounded text-sm text-white backdrop-blur-sm'>
                {selectedPicture.angle || 'No angle specified'}
              </div>
              {selectedPicture.description && (
                <div className='px-3 py-1.5 bg-black/80 rounded text-sm text-white max-w-xl text-center backdrop-blur-sm'>
                  {selectedPicture.description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
