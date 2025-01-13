'use client';

import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import Image from 'next/image';

interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
}

const SAMPLE_VEHICLES: Vehicle[] = [
  { id: '1', licensePlate: 'ABC 123', make: 'Toyota', model: 'Camry' },
  { id: '2', licensePlate: 'XYZ 789', make: 'Honda', model: 'Civic' },
  { id: '3', licensePlate: 'DEF 456', make: 'Toyota', model: 'Corolla' },
];

export function VehicleCheckInForm() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use back camera if available
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
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
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(blob));
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Selected Vehicle:', selectedVehicle);
    console.log('Image File:', imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl'>
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
          <label className='block text-sm font-medium text-gray-400 mb-2'>Vehicle Image</label>
          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg bg-black/40'>
            <div className='space-y-2 text-center w-full'>
              {showCamera ? (
                <div className='relative'>
                  <video ref={videoRef} autoPlay playsInline className='w-full rounded-lg' />
                  <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-4'>
                    <button
                      type='button'
                      onClick={capturePhoto}
                      className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                    >
                      Take Photo
                    </button>
                    <button
                      type='button'
                      onClick={stopCamera}
                      className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : previewUrl ? (
                <div className='relative w-full h-64'>
                  <button
                    type='button'
                    onClick={() => {
                      setPreviewUrl(null);
                      setImageFile(null);
                    }}
                    className='absolute top-2 right-2 p-1 bg-gray-800 rounded-full text-gray-400 hover:text-white z-10'
                  >
                    <X size={20} />
                  </button>
                  <Image src={previewUrl} alt='Vehicle preview' fill className='object-contain rounded-lg' />
                </div>
              ) : (
                <div className='flex flex-col items-center'>
                  <Camera className='h-12 w-12 text-gray-400' />
                  <div className='flex flex-col space-y-2 text-sm text-gray-400'>
                    <div>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none'
                      >
                        <span>Upload an image</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          accept='image/*'
                          className='sr-only'
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <button
                      type='button'
                      onClick={startCamera}
                      className='inline-flex items-center space-x-2 text-blue-500 hover:text-blue-400'
                    >
                      <Camera size={16} />
                      <span>Take a photo</span>
                    </button>
                  </div>
                  <p className='text-xs text-gray-500 mt-2'>PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={!selectedVehicle || !imageFile}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
