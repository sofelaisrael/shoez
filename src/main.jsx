import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './app/store';
import FilteredProducts from './pages/FilteredProducts';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/filteredProducts/",
        element: <FilteredProducts />
      },
      {
        path: "/filteredProducts/:id",
        element: <SingleProduct />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/wishlist",
        element: <WishList />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/register",
        element: <SignUp />
      },
      {
        path: "/log-in",
        element: <SignIn />
      },

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

