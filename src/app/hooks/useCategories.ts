import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCategories = async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products/categories');
    return data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

export const useCategories = () => {
  return useQuery('categories', fetchCategories);
};
