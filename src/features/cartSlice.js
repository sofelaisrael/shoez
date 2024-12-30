import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const fetchFirestoreCart = createAsyncThunk(
  "cart/fetchFirestoreCart",
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const cartRef = collection(db, "cart");
      const q = query(cartRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const cartItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return cartItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToFirestoreCart = createAsyncThunk(
  "cart/addToFirestoreCart",
  async (product, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const uid = user.uid;
      const cartRef = collection(db, "cart");

      const q = query(
        cartRef,
        where("uid", "==", uid),
        where("asin", "==", product.asin)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const existingData = existingDoc.data();
        const updatedAmount = existingData.amount + product.amount;
        const updatedTotalPrice =
          existingData.totalPrice + product.price * product.amount;

          console.log(existingDoc, existingData, updatedAmount, updatedTotalPrice);
          

        await updateDoc(doc(db, "cart", existingDoc.id), {
          amount: updatedAmount,
          totalPrice: updatedTotalPrice,
        });

        return {
          id: existingDoc.id,
          ...existingData,
          amount: updatedAmount,
          totalPrice: updatedTotalPrice,
        };
      } else {
        const docRef = await addDoc(cartRef, {
          ...product,
          uid,
          totalPrice: product.price * product.amount,
        });

        return { id: docRef.id, ...product, uid };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFirestoreCart = createAsyncThunk(
  "cart/removeFromFirestoreCart",
  async (productId, { rejectWithValue }) => {
    console.log(productId);
    
    try {
      await deleteDoc(doc(db, "cart", productId));
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearFirestoreCart = createAsyncThunk(
  "cart/clearFirestoreCart",
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const cartRef = collection(db, "cart");
      const q = query(cartRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeOneFromFirestoreCart = createAsyncThunk(
  "cart/removeOneFromFirestoreCart",
  async (asin, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const uid = user.uid; // Get current user's ID
      const cartRef = collection(db, "cart");

      // Query to find the item by `asin` and `uid`
      const q = query(
        cartRef,
        where("asin", "==", asin),
        where("uid", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Item not found in cart");
      }

      const docId = querySnapshot.docs[0].id;
      const existingProduct = querySnapshot.docs[0].data();

      if (existingProduct.amount > 1) {
        // Decrease `amount` and update `totalPrice`
        const updatedAmount = existingProduct.amount - 1;
        const updatedTotalPrice =
          updatedAmount * parseFloat(existingProduct.price);

        const productRef = doc(db, "cart", docId);
        await updateDoc(productRef, {
          amount: updatedAmount,
          totalPrice: updatedTotalPrice,
        });

        return {
          id: docId,
          ...existingProduct,
          amount: updatedAmount,
          totalPrice: updatedTotalPrice,
        };
      } else {
        // If `amount` is 1, remove the item from Firestore
        await deleteDoc(doc(db, "cart", docId));
        return { id: docId, ...existingProduct, removed: true };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirestoreCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirestoreCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        state.totalAmount = action.payload.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        state.totalPrice = action.payload.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        console.log(state.totalAmount, state.totalPrice);
        
      })
      .addCase(fetchFirestoreCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFirestoreCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFirestoreCart.fulfilled, (state, action) => {
        state.loading = false;
        const existingItem = state.items.find(
          (item) => item.asin === action.payload.asin
        );

        if (existingItem) {
          existingItem.amount = action.payload.amount;
          existingItem.totalPrice = action.payload.totalPrice;
          console.log(existingItem.amount, action.payload);
          
        } else {
          state.items.push(action.payload);
        }

        state.totalAmount += action.payload.amount;
        state.totalPrice += action.payload.totalPrice;
      })
      .addCase(addToFirestoreCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFirestoreCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFirestoreCart.fulfilled, (state, action) => {
        state.loading = false;
        const itemToRemove = state.items.find(
          (item) => item.id === action.payload
        );
        if (itemToRemove) {
          state.totalAmount -= itemToRemove.amount;
          state.totalPrice -= itemToRemove.totalPrice;
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      })
      .addCase(removeFromFirestoreCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearFirestoreCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearFirestoreCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
      })
      .addCase(clearFirestoreCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeOneFromFirestoreCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOneFromFirestoreCart.fulfilled, (state, action) => {
        state.loading = false;
  
        const itemIndex = state.items.findIndex(
          (item) => item.asin === action.payload.asin
        );
  
        if (itemIndex !== -1) {
          if (action.payload.removed) {
            state.items.splice(itemIndex, 1);
          } else {
            state.items[itemIndex] = action.payload;
          }
        }
      })
      .addCase(removeOneFromFirestoreCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
