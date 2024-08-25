import React from 'react';
import { AppProps } from 'next/app';
import { CartProvider } from '@/app/context/CartContext'; // Ajuste o caminho conforme necessário

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
};

export default MyApp;
