'use client';

import { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';

interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
}

interface PhotoFile {
  id: string;
  file: File;
  previewUrl: string;
  angle: VehicleAngle;
}

type VehicleAngle = 'front-right' | 'front-left' | 'rear-right' | 'rear-left';

const VEHICLE_ANGLES: { id: VehicleAngle; label: string }[] = [
  { id: 'front-right', label: 'Front Right' },
  { id: 'front-left', label: 'Front Left' },
  { id: 'rear-right', label: 'Rear Right' },
  { id: 'rear-left', label: 'Rear Left' },
];

const SAMPLE_VEHICLES: Vehicle[] = [
  { id: '1', licensePlate: 'ABC 123', make: 'Toyota', model: 'Camry' },
  { id: '2', licensePlate: 'XYZ 789', make: 'Honda', model: 'Civic' },
  { id: '3', licensePlate: 'DEF 456', make: 'Toyota', model: 'Corolla' },
];

export function VehicleCheckInForm() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState<VehicleAngle | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async (angle: VehicleAngle) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setSelectedAngle(angle);
      setShowCamera(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setSelectedAngle(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && selectedAngle) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${selectedAngle}-${Date.now()}.jpg`, { type: 'image/jpeg' });
            const newPhoto: PhotoFile = {
              id: Date.now().toString(),
              file,
              previewUrl: URL.createObjectURL(blob),
              angle: selectedAngle,
            };
            setPhotos((prev) => {
              // Remove existing photo with same angle if it exists
              const filtered = prev.filter((p) => p.angle !== selectedAngle);
              return [...filtered, newPhoto];
            });
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, angle: VehicleAngle) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPhoto: PhotoFile = {
        id: Date.now().toString() + Math.random(),
        file,
        previewUrl: URL.createObjectURL(file),
        angle,
      };

      setPhotos((prev) => {
        // Remove existing photo with same angle if it exists
        const filtered = prev.filter((p) => p.angle !== angle);
        return [...filtered, newPhoto];
      });
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos((prev) => {
      const updatedPhotos = prev.filter((photo) => photo.id !== photoId);
      // Revoke the URL to prevent memory leaks
      const photoToRemove = prev.find((photo) => photo.id === photoId);
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }
      return updatedPhotos;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length !== VEHICLE_ANGLES.length) {
      alert('Please provide photos from all required angles');
      return;
    }
    // TODO: Implement form submission
    console.log('Selected Vehicle:', selectedVehicle);
    console.log('Photos:', photos);
  };

  const getPhotoForAngle = (angle: VehicleAngle) => {
    return photos.find((photo) => photo.angle === angle);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-2xl mx-auto px-4 sm:px-6'>
      <div className='space-y-8'>
        {/* Vehicle Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-400 mb-2'>Select a vehicle</label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className='w-full bg-black/40 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none'
          >
            <option value=''>Choose a vehicle</option>
            {SAMPLE_VEHICLES.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.licensePlate} - {vehicle.make} {vehicle.model}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <div className='flex justify-between items-center mb-4'>
            <label className='block text-sm font-medium text-gray-400'>Vehicle Images</label>
            <span className='text-sm text-gray-400'>
              {photos.length}/{VEHICLE_ANGLES.length} angles
            </span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {VEHICLE_ANGLES.map(({ id: angle, label }) => {
              const photo = getPhotoForAngle(angle);
              return (
                <div key={angle} className='relative aspect-square'>
                  {photo ? (
                    // Show captured photo
                    <div className='relative h-full'>
                      <Image src={photo.previewUrl} alt={`Vehicle ${label}`} fill className='object-cover rounded-lg' />
                      <div className='absolute top-2 left-2 bg-black/60 px-3 py-1.5 rounded text-sm text-white font-medium'>
                        {label}
                      </div>
                      <button
                        type='button'
                        onClick={() => removePhoto(photo.id)}
                        className='absolute top-2 right-2 p-2 bg-black/60 rounded-full text-gray-200 hover:text-white transition-colors'
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : showCamera && selectedAngle === angle ? (
                    // Show camera view
                    <div className='relative h-full'>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className='absolute inset-0 w-full h-full rounded-lg object-cover'
                      />
                      <div className='absolute top-2 left-2 bg-black/60 px-3 py-1.5 rounded text-sm text-white font-medium'>
                        {label}
                      </div>
                      <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-3'>
                        <button
                          type='button'
                          onClick={capturePhoto}
                          className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors'
                        >
                          Take Photo
                        </button>
                        <button
                          type='button'
                          onClick={stopCamera}
                          className='px-4 py-2 bg-black/60 text-white text-sm font-medium rounded-lg hover:bg-black/70 transition-colors'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Show upload button
                    <div className='h-full border-2 border-gray-700 border-dashed rounded-lg bg-black/40 flex flex-col items-center justify-center p-6'>
                      <input
                        type='file'
                        id={`file-upload-${angle}`}
                        accept='image/*'
                        className='sr-only'
                        onChange={(e) => handleImageUpload(e, angle)}
                      />
                      <div className='absolute top-2 left-2 bg-black/60 px-3 py-1.5 rounded text-sm text-white font-medium'>
                        {label}
                      </div>
                      <Plus className='h-10 w-10 text-gray-400 mb-3' />
                      <div className='flex flex-col items-center text-sm text-gray-400'>
                        <label
                          htmlFor={`file-upload-${angle}`}
                          className='cursor-pointer text-blue-500 hover:text-blue-400 font-medium'
                        >
                          Upload photo
                        </label>
                        <span className='my-1.5'>or</span>
                        <button
                          type='button'
                          onClick={() => startCamera(angle)}
                          className='text-blue-500 hover:text-blue-400 font-medium'
                        >
                          Take a photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={!selectedVehicle || photos.length !== VEHICLE_ANGLES.length}
            className='w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Submit Check-in
          </button>
        </div>
      </div>
    </form>
  );
}
