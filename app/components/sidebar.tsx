'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path ? 'bg-gray-800' : '';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors'
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && <div className='lg:hidden fixed inset-0 bg-black/50 z-40' onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-black text-white z-40
        w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-30
      `}
      >
        <div className='p-4'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Vehicle Check</h1>
          </div>

          <nav className='space-y-2'>
            <Link
              href='/dashboard'
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${isActive(
                '/dashboard'
              )}`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link
              href='/vehicle-history'
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${isActive(
                '/vehicle-history'
              )}`}
            >
              <FileText size={20} />
              <span>Vehicle History</span>
            </Link>
          </nav>

          <div className='absolute bottom-4 right-4'>
            <button className='p-2 rounded-full hover:bg-gray-800 transition-colors'>
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
