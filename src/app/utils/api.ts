export const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  };