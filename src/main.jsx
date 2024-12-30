import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import { SnackbarProvider } from "notistack";
import FilteredProducts from "./pages/FilteredProducts";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { store } from "./app/store";

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
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>
);
