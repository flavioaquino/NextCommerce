'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type ProductCategoryProps = {
  products: Product[];
};

const ProductCategory: React.FC<ProductCategoryProps> = ({ products }) => {
  const router = useRouter();

  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  const handleCategoryClick = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="pt-6 grid grid-cols-6 gap-4">
      {uniqueCategories.map((category) => {
        const product = products.find(p => p.category === category);
        return (
          <div key={category} className="cursor-pointer bg-white border border-gray-200 rounded-lg max-w-xs  shadow-lg" onClick={() => handleCategoryClick(category)}>
            <img src={product?.image} alt={category} className="rounded-lg w-full h-64 object-contain mt-3 hover:scale-110 transition-transform duration-300 ease-in-ou" />
            <h2 className="text-center mt-2 text-black capitalize text-lg font-bold pb-2">{category}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
