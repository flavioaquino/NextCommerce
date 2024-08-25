'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter();

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <header className="bg-gray-800 text-white p-6 fixed top-0 left-0 w-full flex justify-between items-center font-bold z-50">
      <div className="text-xl font-bold">
        <a href="/">NextCommerce</a>
      </div>
      <nav>
        <a href="/category">Categories</a>
      </nav>
      <div className="flex items-center space-x-4">
        <a href="#">Login</a>
        <button onClick={handleCartClick} className="relative">
          <img src="https://img.icons8.com/?size=100&id=85383&format=png&color=FFFFFF" alt="Cart" className='w-8' />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
