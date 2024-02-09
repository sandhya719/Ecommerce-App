import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store"
import Navbar from './Navbar';
import Products from './Products';
import Cart from "./Cart";
import AddProduct from './addProduct';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Products /> },
      { path: "/products", element: <Products />},
      { path: "/cart", element: <Cart /> },
      { path: "/add-product", element: <AddProduct /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <ErrorBoundary>
  
        </ErrorBoundary>
      </RouterProvider>
    </Provider>
  );
}

export default App;
