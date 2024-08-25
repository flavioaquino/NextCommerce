"use client";

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/app/utils/api';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <img src={product.image} alt={product.title} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
