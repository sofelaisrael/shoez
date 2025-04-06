import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


import { Provider } from "react-redux";
import { store } from "./app/store";


import App from "./App";
import Home from "./pages/Home";
import FilteredProducts from "./pages/FilteredProducts";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Checkout from "./pages/Checkout";


import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";


const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/filteredProducts/", element: <FilteredProducts /> },
      { path: "/filteredProducts/:id", element: <SingleProduct /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <RouterProvider router={router} />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </React.StrictMode>
  </Provider>
);
