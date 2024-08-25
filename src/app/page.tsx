'use client';

import React from 'react';
import ProductCategory from '../app/components/ProductCategory';
import Header from '../app/components/Header';
import { useQuery } from 'react-query';
import axios from 'axios';
import ProductSection from './components/ProductSection';

const fetchProducts = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
};

const Home: React.FC = () => {
  const { data: products, isLoading, error } = useQuery('products', fetchProducts);

  if (isLoading) return <div className="flex bg-white items-center justify-center h-screen text-lg text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-lg text-red-600">Failed to load products</div>;

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <Header />
        <h1 className="p-4 text-2xl font-bold text-gray-800">Our new products</h1>
        <ProductSection products={products} />
      <main className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Navigate by category</h1>
          <ProductCategory products={products} />
      </main>
    </div>
  );

};

export default Home;
