import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="bg-gray-900 text-white p-6 flex justify-between items-center font-bold">
      <div className="text-xl font-bold">
        <a href="/">NextCommerce</a>
      </div>
      <nav>
        <ul className="flex space-x-4 capitalize">
          {categories.map(category => (
            <li key={category}>
              <a href={`/category/${encodeURIComponent(category)}`}>{category}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <a href="#">Login</a>
        <a href="#" className="relative">
          <img src="https://img.icons8.com/?size=100&id=85383&format=png&color=FFFFFF" alt="Cart" className='w-8' />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </a>
      </div>
    </header>
  );
};

export default Header;
