import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function NewCheckInButton() {
  return (
    <Link
      href='/driver/check-ins/new'
      className='inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors'
    >
      <span>New Vehicle Check-in</span>

      <ArrowRight size={20} />
    </Link>
  );
}
