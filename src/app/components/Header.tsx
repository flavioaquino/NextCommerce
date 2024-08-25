'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-6 fixed top-0 left-0 w-full flex justify-between items-center font-bold z-50">
      <div className="text-xl font-bold">
        <a href="/">NextCommerce</a>
      </div>
      <button
        className="lg:hidden flex items-center"
        onClick={handleMenuToggle}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <nav className={`lg:flex lg:space-x-4 hidden transition-transform duration-300 ease-in-out`}>
        <a href="/category" className="block lg:inline-block p-2 hover:bg-gray-700 rounded">Categories</a>
        <a href="#" className="block lg:inline-block p-2 hover:bg-gray-700 rounded">Login</a>
      </nav>
      <div className="flex items-center space-x-4">
        <button onClick={handleCartClick} className="relative">
          <img src="https://img.icons8.com/?size=100&id=85383&format=png&color=FFFFFF" alt="Cart" className="w-8" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleMenuToggle}
      >
        <div className={`fixed top-0 right-0 w-2/3 bg-white text-gray-800 p-6 h-full transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <button onClick={handleMenuToggle} className="absolute top-4 right-4 text-gray-800 text-2xl">&times;</button>
          <nav className="flex flex-col space-y-4 mt-10">
            <a href="/category" className="block p-2 hover:bg-gray-200 rounded">Categories</a>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">Login</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
