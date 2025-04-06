import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ConvexReactClient } from "convex/react";
import { api } from "../../convex/_generated/api";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const initialState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
  loading: false,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { dispatch }) => {
  try {
    const cartItems = await convex.query(api.cart.getCart, { userId });
    dispatch(setCart(cartItems));
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }, { dispatch }) => {
    try {
      await convex.mutation(api.cart.addToCart, { userId, product });
      dispatch(fetchCart(userId));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
);

export const removeOneFromCart = createAsyncThunk(
  "cart/removeOneFromCart",
  async ({ userId, productId }, { dispatch }) => {
    try {
      await convex.mutation(api.cart.removeOneFromCart, { userId, productId });
      dispatch(fetchCart(userId)); 
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }, { dispatch }) => {
    try {
      await convex.mutation(api.cart.removeItem, { userId, productId });
      dispatch(fetchCart(userId)); 
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async (userId, { dispatch }) => {
  try {
    await convex.mutation(api.cart.clearCart, { userId });
    dispatch(fetchCart(userId));
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
});


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.totalAmount = action.payload.reduce((acc, item) => acc + item.amount, 0);
      state.totalPrice = action.payload.reduce((acc, item) => acc + item.totalPrice, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
