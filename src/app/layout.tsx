"use client";

import { QueryClientProvider } from 'react-query';
import queryClient from '@/app/queryClient';
import { CartProvider } from '@/app/context/CartContext';
import '@/app/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            {children}
          </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
