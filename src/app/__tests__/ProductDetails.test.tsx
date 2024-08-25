import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from '../../app/product/[product]/page';
import { useCart } from '../../app/context/CartContext';
import mockAxios from 'jest-mock-axios';
import React from 'react';

jest.mock('axios');

const queryClient = new QueryClient();

jest.mock('../context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('ProductDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductDetails />
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders product details', async () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      description: 'Description',
      price: 100,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
      rating: { rate: 4.5, count: 10 },
    };
    mockAxios.get.mockResolvedValueOnce({ data: mockProduct });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductDetails />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
      expect(screen.getByText(/Description/i)).toBeInTheDocument();
      expect(screen.getByText(/R\$ 100.00/i)).toBeInTheDocument();
    });
  });

  test('handles add to cart', async () => {
    const addToCartMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({ addToCart: addToCartMock });

    const mockProduct = {
      id: 1,
      title: 'Test Product',
      description: 'Description',
      price: 100,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
      rating: { rate: 4.5, count: 10 },
    };
    mockAxios.get.mockResolvedValueOnce({ data: mockProduct });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductDetails />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const button = screen.getByText(/Add to cart/i);
      fireEvent.click(button);
      expect(addToCartMock).toHaveBeenCalledWith({
        id: 1,
        quantity: 1,
        price: 100,
        image: 'https://via.placeholder.com/150',
        title: 'Test Product',
      });
    });
  });
});
