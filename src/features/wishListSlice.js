import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ConvexReactClient } from "convex/react";
import { api } from "../../convex/_generated/api";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const wishlist = await convex.query(api.wishlist.getWishlist, { userId });
      return wishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, product }, { dispatch, rejectWithValue }) => {
    try {
      await convex.mutation(api.wishlist.addToWishList, { userId, product });
      dispatch(fetchWishlist(userId));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, { dispatch, rejectWithValue }) => {
    try {
      await convex.mutation(api.wishlist.removeItem, { userId, productId });
      dispatch(fetchWishlist(userId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await convex.mutation(api.wishlist.clearList, { userId });
      dispatch(fetchWishlist(userId));
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default wishListSlice.reducer;