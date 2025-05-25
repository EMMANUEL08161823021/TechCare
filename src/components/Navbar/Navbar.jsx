import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='fixed w-[100%] my-2 rounded-xl bg-white shadow-md'>
      <div className='flex items-center justify-between p-4'>
        {/* Logo */}
        <div className='text-xl font-bold flex items-center gap-2'>
          <img src='src/assets/TestLogo.svg' alt='logo' style={{}} />
        </div>

        {/* Hamburger for Mobile */}
        <button
          className='lg:hidden text-2xl'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle Menu'
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <nav className='hidden lg:flex lg:items-center gap-6'>
          <ul className='flex gap-3'>
            <li><a href='#' className='hover:text-blue-600'>Overview</a></li>
            <li><a href='#' className='hover:text-blue-600'>Patients</a></li>
            <li><a href='#' className='hover:text-blue-600'>Schedule</a></li>
            <li><a href='#' className='hover:text-blue-600'>Message</a></li>
            <li><a href='#' className='hover:text-blue-600'>Transactions</a></li>
          </ul>
        </nav>

        {/* Desktop Profile */}
        <div className='hidden lg:flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <img src='src/assets/senior-woman.png' alt='profile' className='w-10 h-10 rounded-full object-cover' />
            <div className='leading-tight'>
              <h3 className='font-medium text-sm'>Dr. Jose Simmons</h3>
              <p className='text-xs text-gray-500'>General Practitioner</p>
            </div>
          </div>
          <div className='flex gap-2 text-xl'>
            <span>🔔</span>
            <span>⚙️</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='lg:hidden px-4 pb-4 space-y-4'>
          <ul className='flex flex-col gap-2'>
            <li><a href='#' className='block py-2 px-3 rounded hover:bg-gray-100'>Overview</a></li>
            <li><a href='#' className='block py-2 px-3 rounded hover:bg-gray-100'>Patients</a></li>
            <li><a href='#' className='block py-2 px-3 rounded hover:bg-gray-100'>Schedule</a></li>
            <li><a href='#' className='block py-2 px-3 rounded hover:bg-gray-100'>Message</a></li>
            <li><a href='#' className='block py-2 px-3 rounded hover:bg-gray-100'>Transactions</a></li>
          </ul>

          <div className='flex items-center gap-3 mt-4'>
            <img src='src/assets/senior-woman.png' alt='profile' className='w-10 h-10 rounded-full object-cover' />
            <div>
              <h3 className='font-medium text-sm'>Dr. Jose Simmons</h3>
              <p className='text-xs text-gray-500'>General Practitioner</p>
            </div>
            <div className='ml-auto flex gap-2 text-xl'>
              <span>🔔</span>
              <span>⚙️</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
