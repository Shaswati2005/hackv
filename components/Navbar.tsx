'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = ['Home', 'Support', 'Contact'];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:px-8 lg:px-16 py-4 shadow-sm relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          <span className="text-xl font-semibold text-black">LegalFlow</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setActiveItem(item)}
              className={`pb-1 ${
                activeItem === item
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="block h-0.5 bg-black" />
              <span className="block h-0.5 bg-black" />
              <span className="block h-0.5 bg-black" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => {
                setActiveItem(item);
                setIsOpen(false);
              }}
              className={`block ${
                activeItem === item
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
