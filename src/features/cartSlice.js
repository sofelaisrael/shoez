import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        totalAmount: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            const productId = action.payload;
            try {
                const exist = state.cart.find(
                    (product) =>
                        product.asin === productId.asin
                );
                console.log(exist, productId.asin);
                if (exist) {
                    exist.amount += parseFloat(productId.amount);
                    exist.totalPrice += parseFloat(productId.price) * parseFloat(productId.amount);
                    state.totalAmount += parseFloat(productId.amount);
                    state.totalPrice += parseFloat(productId.price) * parseFloat(productId.amount);
                } else {
                    state.cart.push({
                        price: parseFloat(productId.price),
                        amount: productId.amount,
                        totalPrice: parseFloat(productId.price) * productId.amount,
                        name: productId.name,
                        text: productId.text,
                        asin: productId.asin,
                        img: productId.img
                    });
                    state.totalAmount += parseFloat(productId.amount);
                    state.totalPrice += parseFloat(productId.price) * parseFloat(productId.amount);
                    console.log(action.payload.amount, state.totalAmount, state.totalPrice);
                    sessionStorage.setItem('cart', {
                        price: parseFloat(productId.price),
                        amount: productId.amount,
                        totalPrice: parseFloat(productId.price) * productId.amount,
                        name: productId.name,
                        text: productId.text,
                        asin: productId.asin,
                        img: productId.img
                    })

                }

            } catch (err) {
                return err;
            }
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            try {
                const exist = state.cart.find(
                    (product) =>
                        product.asin === productId.asin
                );
                if (exist.amount === 1) {
                    state.cart = state.cart.filter(
                        (product) =>
                            product.asin !== productId.asin
                    );
                    state.totalAmount--;
                    state.totalPrice -= productId.price;
                } else {
                    exist.amount--;
                    exist.totalPrice -= productId.price;
                    state.totalAmount--;
                    state.totalPrice -= productId.price;
                }
            } catch (err) {
                return err;
            }
        },
        removeItem(state, action) {
            const productId = action.payload;
            let slicer = 0
            try {
                // const exist = state.cart.find(
                //     (product) =>
                //         product.asin === productId.asin
                // );
                const exist = state.cart.map((product, index) => {
                    if (product.asin === productId.asin) {
                        slicer = index
                        return slicer
                    }
                });
                state.totalAmount--;
                state.totalPrice-= parseFloat(productId.price)
                state.cart.splice(slicer, 1)
                console.log(exist, slicer);

            } catch (err) {
                return err
            }

        },
        clearCart(state) {
            state.cart = []
            state.totalAmount = 0
            state.totalPrice = 0
        }
    },
});

export const { addToCart, removeFromCart, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
