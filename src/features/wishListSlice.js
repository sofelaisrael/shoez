import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
    name: "wishlist",
    initialState: {
        list: [],
    },
    reducers: {
        addToWishList(state, action) {
            const productId = action.payload;
            try {
                const exist = state.list.find(
                    (product) =>
                        product.asin === productId.asin
                );
                if (exist) {
                    return 
                } else {
                    state.list.push({
                        price: parseFloat(productId.price),
                        name: productId.name,
                        asin: productId.asin,
                        img: productId.img
                    });
                }

            } catch (err) {
                return err;
            }
        },
        removeitem(state, action) {
            const productId = action.payload;
            const productIndex = state.list.findIndex((item) => item.asin === productId);

            if (productIndex !== -1) {
                // const product = state.list[productIndex];
                state.list.splice(productIndex, 1);
        
                sessionStorage.setItem("wishlist", JSON.stringify(state.list));
              }
            // let slicer = 0
            // try {
            //     const exist = state.list.map((product, index) => {
            //         if (product.asin === productId.asin) {
            //             slicer = index
            //             return slicer
            //         }
            //     });
            //     console.log(exist);
                
            //     state.list.splice(slicer, 1)

            // } catch (err) {
            //     return err
            // }

        },
        clearList(state) {
            state.list = []
        }
    },
});

export const { addToWishList, removeitem, clearList } = wishListSlice.actions;
export default wishListSlice.reducer;
