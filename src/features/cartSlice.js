import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const exist = state.cart.find((item) => item.asin === product.asin);

      if (exist) {
        exist.amount += product.amount;
        exist.totalPrice += product.price * product.amount;
      } else {
        state.cart.push({
          ...product,
          totalPrice: product.price * product.amount,
        });
      }

      state.totalAmount += product.amount;
      state.totalPrice += product.price * product.amount;

      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeOneFromCart(state, action) {
      const productId = action.payload;
      const product = state.cart.find((item) => item.asin === productId);

      if (product) {
        if (product.amount > 1) {
          product.amount--;
          product.totalPrice -= product.price;
          state.totalAmount--;
          state.totalPrice -= product.price;
        } else {
          state.cart = state.cart.filter((item) => item.asin !== productId);
          state.totalAmount--;
          state.totalPrice -= product.price;
        }

        sessionStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeItem(state, action) {
      const productId = action.payload;
      const productIndex = state.cart.findIndex((item) => item.asin === productId);

      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        state.totalAmount -= product.amount;
        state.totalPrice -= product.totalPrice;
        state.cart.splice(productIndex, 1);

        sessionStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeOneFromCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
