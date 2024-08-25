# NextCommerce

Welcome to **NextCommerce**, a modern e-commerce platform built with Next.js and integrated with the Fake Store API. This platform allows users to browse products and manage their shopping cart with ease.

## Features

- **Product Browsing**: Explore a wide range of products fetched from the Fake Store API.
- **Shopping Cart Management**: Add and remove items from the cart, with a dynamic cart preview.
- **Optimized Performance**: Utilizing Next.js's rendering strategies (SSR, SSG, ISR) for a fast and responsive user experience.
- **State Management**: Efficient use of React hooks and React Query for state management, caching, and synchronization with the API.
- **Responsive Design**: Fully responsive design, ensuring a seamless shopping experience on both desktop and mobile devices.

## Tech Stack

- **Next.js**: React framework with server-side rendering capabilities.
- **React Query**: For efficient data fetching, caching, and synchronization.
- **CSS Modules / Styled Components**: For component-level styling.
- **Fake Store API**: Source of product and user data.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextcommerce.git
   ```
2. Navigate to the project directory:

   ```bash
   cd nextcommerce
   ```
3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
## Running the Application

To run the application locally:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will start on http://localhost:3000.

## Building for Production

To build the application for production:

   ```bash
   npm run build
   # or
   yarn build
   ```
This will create an optimized build in the .next directory. You can then start the production server:

   ```bash
   npm start
   # or
   yarn start
   ```
## Deploying the Application

The application can be easily deployed to platforms like Vercel. Here's how you can do it:

1. Push your code to a Git repository.
2. Connect your repository to Vercel.
3. Vercel will automatically build and deploy your application.

## API Integration

This application integrates with the Fake Store API to fetch product data. The API calls are handled using React Query to provide efficient data fetching and caching.

## Project Structure

- **pages/**: Contains the Next.js pages.
- **components/**: Reusable React components.
- **styles/**: Component-specific styles using CSS Modules or Styled Components.
- **hooks/**: Custom hooks for state management and API calls.
- **utils/**: Utility functions.
- **public/**: Static assets.

## Testing

Tests are written using Jest and React Testing Library. To run tests:
  
   ```bash
   npm test
   # or
   yarn test
   ```

## Contributing

Feel free to open issues or submit pull requests if you find any bugs or have ideas for new features. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/flavioaquino/NextCommerce?tab=MIT-1-ov-file#) file for more details.
