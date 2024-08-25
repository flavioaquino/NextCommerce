import React from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ProductSectionProps = {
  title: string;
  products: Product[];
};

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-gray-800 text-white p-4 rounded-lg">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-red-500">R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
