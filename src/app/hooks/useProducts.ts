import { useQuery } from 'react-query';
import {fetchProducts} from '../../app/utils/api';

export const useProducts = () => {
  return useQuery('products', fetchProducts);
};