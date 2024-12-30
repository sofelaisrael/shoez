import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  where,
  query,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth } from "firebase/auth";

export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          return rejectWithValue("User is not authenticated.");
        }
  
        const uid = user.uid; 
        console.log("Fetching wishlist for UID:", uid);
  
        const wishlistRef = collection(db, "wishlist");
        const q = query(wishlistRef, where("uid", "==", uid)); 
  
        const querySnapshot = await getDocs(q);
        const wishlist = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log("Fetched wishlist:", wishlist);
        return wishlist;
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        return rejectWithValue(error.message);
      }
    }
  );

export const addToFirestoreWishList = createAsyncThunk(
  "wishlist/addToFirestoreWishList",
  async (product, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        return rejectWithValue("User is not authenticated.");
      }

      const uid = user.uid; 
      console.log("Current User UID:", uid);

      if (!product.name || !product.price || !product.asin) {
        return rejectWithValue("Invalid product data.");
      }

      const wishlistRef = collection(db, "wishlist");
      const q = query(
        wishlistRef,
        where("name", "==", product.name),
        where("price", "==", product.price),
        where("uid", "==", uid),
        where("asin", "==", product.asin)
      );

      const querySnapshot = await getDocs(q);
      console.log("Query Snapshot Empty:", querySnapshot.empty);

      if (!querySnapshot.empty) {
        return rejectWithValue("A product with these fields already exists.");
      }

      const docRef = await addDoc(wishlistRef, {
        ...product,
        uid,
      });

      return { id: docRef.id, ...product, uid };
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFirestoreWishList = createAsyncThunk(
  "wishlist/removeFromFirestoreWishList",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "wishlist", productId));
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearList(state) {
      state.list = [];
    },
  },
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
      .addCase(addToFirestoreWishList.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addToFirestoreWishList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromFirestoreWishList.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromFirestoreWishList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearList } = wishListSlice.actions;
export default wishListSlice.reducer;
