import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../../app/context/CartContext';
import React from 'react';

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  return (
    <div>
      <button onClick={() => addToCart({ id: 1, quantity: 1, price: 100, image: 'img', title: 'Item' })}>
        Add Item
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={clearCart}>Clear Cart</button>
      <div data-testid="cart">{JSON.stringify(cart)}</div>
    </div>
  );
};

describe('CartContext', () => {
  test('adds, removes, and clears items in cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText(/Add Item/i);
    fireEvent.click(addButton);

    expect(screen.getByTestId('cart')).toHaveTextContent('{"id":1,"quantity":1,"price":100,"image":"img","title":"Item"}');

    const removeButton = screen.getByText(/Remove Item/i);
    fireEvent.click(removeButton);
    expect(screen.getByTestId('cart')).toHaveTextContent('[]');

    const clearButton = screen.getByText(/Clear Cart/i);
    fireEvent.click(clearButton);
    expect(screen.getByTestId('cart')).toHaveTextContent('[]');
  });
});
