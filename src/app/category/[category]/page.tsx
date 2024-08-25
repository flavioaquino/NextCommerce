'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';
import Header from '@/app/components/Header';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);
  return data;
};

const CategoryPage: React.FC = () => {
  const { category } = useParams() as { category: string };
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const { data: products, isLoading, error } = useQuery<Product[]>(
    ['productsByCategory', category],
    () => fetchProductsByCategory(category)
  );

  const { addToCart } = useCart();

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  if (isLoading) return <div className="flex bg-white items-center justify-center h-screen text-lg text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-lg text-red-600">Failed to load products for {category}</div>;

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          const priceOld = (product.price * 1.5).toFixed(2);

          return (
            <div
              key={product.id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              style={{ height: '26rem' }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out scale-90 hover:scale-100 cursor-pointer"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onClick={() => handleImageClick(product.image)}
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
                <h2 className="text-center text-lg font-semibold cursor-pointer text-gray-800" onClick={() => handleProductClick(product.id)}>{product.title}</h2>
                <div className="text-center mt-2 cursor-pointer" onClick={() => handleProductClick(product.id)}>
                  <span className="line-through text-gray-500 text-lg">R$ {priceOld}</span>
                  <span className="ml-2 text-lg font-semibold text-red-800">R$ {product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="block w-full bg-gray-800 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-gray-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {selectedImage && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Popup"
              className="w-full max-w-lg h-auto transition-transform duration-300 ease-in-out hover:scale-150"
              style={{ maxHeight: '80vh' }}
            />
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
