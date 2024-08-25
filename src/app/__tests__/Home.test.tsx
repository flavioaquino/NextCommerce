import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '../../app/page'; // Ajuste o caminho conforme necessário
import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>; // Tipo correto para o mock
const queryClient = new QueryClient();

describe('Home', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state', () => {
    mockAxios.get.mockImplementationOnce(() => new Promise(() => {})); // Mock do loading
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    mockAxios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    expect(await screen.findByText(/failed to load products/i)).toBeInTheDocument();
  });

  test('renders products and categories', async () => {
    const mockProducts = [{ id: 1, title: 'Test Product' }];
    mockAxios.get.mockResolvedValueOnce({ data: mockProducts });
    
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Our new products/i)).toBeInTheDocument();
      expect(screen.getByText(/Navigate by category/i)).toBeInTheDocument();
    });
  });
});
