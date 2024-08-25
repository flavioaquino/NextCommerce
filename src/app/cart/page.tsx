'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import Header from '@/app/components/Header';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Função para calcular o valor total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl text-black font-semibold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-lg text-gray-700">Your cart is empty.</div>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <div className="text-lg text-gray-700">
                    <span className="font-semibold">R$ {item.price.toFixed(2)}</span> x {item.quantity}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">Total</h2>
              <span className="text-xl font-semibold text-red-800">R$ {calculateTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleClearCart}
              className="block w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 mt-4"
            >
              Clear Cart
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
