import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link to='/' className='text-white font-bold text-xl'>
              CarApp
            </Link>
          </div>
          <div className='flex'>
            <Link
              to='/dashboard/activity'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
            >
              Activity
            </Link>
            <Link
              to='/dashboard/order'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
            >
              Orders
            </Link>
            <Link
              to='/deleted'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
            >
              Deleted
            </Link>
            <Link
              to='/approved-orders'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
            >
              Approved Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
