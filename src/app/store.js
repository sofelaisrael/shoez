import { configureStore } from "@reduxjs/toolkit";
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import cartSlice from "../features/cartSlice";
import wishListSlice from "../features/wishListSlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    wishlist: wishListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { getFirebase, getFirestore },
      },
    })
});
