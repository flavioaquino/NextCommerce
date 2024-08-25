'use client';

import { useParams } from 'next/navigation'; // Para Next.js 13+ com roteamento de app
import React, { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import { useCart } from '@/app/context/CartContext'; // Importar useCart para adicionar ao carrinho

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductDetails: React.FC = () => {
  const params = useParams();
  const productId = params.product as string;
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(json => setProduct(json))
        .catch(err => console.error(err));
    }
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  const priceOld = (product.price * 1.5).toFixed(2);

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <Header />
      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img src={product.image} alt={product.title} className="w-lg h-auto object-cover rounded-lg shadow-md" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="line-through text-gray-500 text-lg">R$ {priceOld}</span>
              <span className="ml-2 text-xl font-semibold text-red-800">R$ {product.price.toFixed(2)}</span>
            </div>
            <p className="text-md mb-2">Category: {product.category}</p>
            <p className="text-md mb-4">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <button
              onClick={handleAddToCart}
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
