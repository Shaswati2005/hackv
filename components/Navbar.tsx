"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const menuItems = ["Home", "Support", "Contact"];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:px-8 lg:px-16 py-4 shadow-sm relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setActiveItem(item)}
              className={`
                relative pb-1 
                ${
                  activeItem === item
                    ? "text-indigo-600 border-b-2 border-indigo-500"
                    : "text-gray-600"
                }
                hover:text-indigo-600
                transition-colors duration-300
              `}
            >
              {/* Animated underline */}
              <span
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-indigo-600
                  transition-all duration-300
                  ${activeItem === item ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
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
              className={`
                block
                relative
                ${
                  activeItem === item
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-600"
                }
                hover:text-indigo-600
                transition-colors duration-300
              `}
            >
              {/* Animated underline for mobile as well */}
              <span
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-indigo-600
                  transition-all duration-300
                  ${activeItem === item ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
