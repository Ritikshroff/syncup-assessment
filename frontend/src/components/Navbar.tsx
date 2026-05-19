"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiActivity, FiEdit3 } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
                <FiActivity size={18} />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">
                SYNCUP
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                pathname === '/' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Feed
            </Link>
            <Link 
              href="/admin" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                pathname === '/admin' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiEdit3 className="mr-2" /> Publish
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
