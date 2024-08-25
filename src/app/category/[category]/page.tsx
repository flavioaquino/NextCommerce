'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';
import Header from '@/app/components/Header';

interface Product {
  id: number;
  title: string;
  image: string;
}

const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);
  return data;
};

const CategoryPage: React.FC = () => {
  const { category } = useParams() as { category: string };

  const { data: products, isLoading, error } = useQuery<Product[]>(
    ['productsByCategory', category],
    () => fetchProductsByCategory(category)
  );

  if (isLoading) return <div className="flex bg-white items-center justify-center h-screen text-lg text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-lg text-red-600">Failed to load products for {category}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CategoryPage;
