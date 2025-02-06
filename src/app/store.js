import { configureStore } from "@reduxjs/toolkit";
// import slideReducer from "../features/sliderSlice";
import productsReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import wishListReducer from "../features/wishListSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
  },
});