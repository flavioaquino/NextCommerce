'use client'; // Assegure-se de que o componente está sendo renderizado no cliente

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' se estiver usando o Next.js 13+

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ProductCarouselProps = {
  products: Product[];
};

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5;
  const itemsCount = products.length;
  const router = useRouter();

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= itemsCount ? 0 : prevIndex + itemsToShow
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsToShow < 0 ? itemsCount - itemsToShow : prevIndex - itemsToShow
    );
  };

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div id="default-carousel" className="relative w-full px-8 py-4 overflow-hidden">
      <div
        className="relative flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 cursor-pointer"
            style={{ width: 'calc(100% / 5 - 16px)', marginRight: '16px' }}
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-lg"
              style={{ objectFit: 'cover' }}
            />
            <p className="bg-gray-800 text-center">R$ {product.price}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-1/2 start-0 z-30 flex items-center justify-center h-12 px-2 cursor-pointer group focus:outline-none transform -translate-y-1/2"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-1/2 end-0 z-30 flex items-center justify-center h-12 px-2 cursor-pointer group focus:outline-none transform -translate-y-1/2"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default ProductCarousel;
