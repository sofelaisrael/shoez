import { createSlice } from "@reduxjs/toolkit";
import data from "../data/amazon_uk_shoes_dataset.json";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        filteredProducts: data,
        singleProduct: data,
        error: false,
        similars: [],
        results: '',
    },
    reducers: {
        filterAll(state, action) {
            const hasStore = (str) => {
                const visit = str.split('Visit the ')
                const store = visit.toString().split('Store')
                if (visit.length > 1) {
                    let com = visit[1].split(' Store').toString();
                    com = com.slice(0, com.length - 1)
                    return com
                } else {
                    return store.toString()
                }
            }


            try {
                const def = (str) => {
                    return str.includes('Any')
                }

                const getLastPrice = (price) => {
                    const last = price.lastIndexOf('£')
                    return price.slice(last + 1)
                }

                const newSHoes = data.filter((shoe) => {
                    // console.log(hasStore(shoe.brand).toUpperCase());

                    if (shoe.price !== null &&
                        hasStore(shoe.brand).toUpperCase() === action.payload.brand.toUpperCase() &&
                        shoe.breadcrumbs.toUpperCase().includes("/" + action.payload.breadcrumb.toUpperCase()) &&
                        parseFloat(getLastPrice(shoe.price)) >= parseFloat(action.payload.min) &&
                        parseFloat(getLastPrice(shoe.price)) <= parseFloat(action.payload.max)) {
                        return shoe
                    }

                    if (shoe.price !== null &&
                        def(action.payload.brand) &&
                        def(action.payload.breadcrumb) &&
                        parseFloat(getLastPrice(shoe.price)) >= parseFloat(action.payload.min) &&
                        parseFloat(getLastPrice(shoe.price)) <= parseFloat(action.payload.max)) {
                        return shoe
                    }

                    if (shoe.price !== null &&
                        !def(action.payload.brand) &&
                        def(action.payload.breadcrumb) &&
                        parseFloat(getLastPrice(shoe.price)) >= parseFloat(action.payload.min) &&
                        parseFloat(getLastPrice(shoe.price)) <= parseFloat(action.payload.max)) {
                        return hasStore(shoe.brand).toUpperCase() === action.payload.brand.toUpperCase()
                    }

                    if (shoe.price !== null &&
                        def(action.payload.brand) &&
                        !def(action.payload.breadcrumb) &&
                        parseFloat(getLastPrice(shoe.price)) >= parseFloat(action.payload.min) &&
                        parseFloat(getLastPrice(shoe.price)) <= parseFloat(action.payload.max)) {
                        return shoe.breadcrumbs.toUpperCase().includes("/" + action.payload.breadcrumb.toUpperCase())
                    }

                    if (shoe.price !== null &&
                        def(action.payload.brand) &&
                        def(action.payload.breadcrumb) &&
                        !parseFloat(action.payload.max) &&
                        !parseFloat(action.payload.min)) {
                        return parseFloat(getLastPrice(shoe.price)) >= parseFloat(action.payload.min) &&
                            parseFloat(getLastPrice(shoe.price)) <= parseFloat(action.payload.max)
                    }

                    if (shoe.price !== null &&
                        !def(action.payload.brand) &&
                        !def(action.payload.breadcrumb) &&
                        parseFloat(getLastPrice(shoe.price)) >= parseFloat(action.payload.min) &&
                        parseFloat(getLastPrice(shoe.price)) <= parseFloat(action.payload.max)) {
                        return hasStore(shoe.brand).toUpperCase() === action.payload.brand.toUpperCase() &&
                            shoe.breadcrumbs.toUpperCase().includes("/" + action.payload.breadcrumb.toUpperCase())
                    }

                })
                console.log(newSHoes);
                state.filteredProducts = newSHoes
            } catch (error) {
                return error
            }

        },
        getSimilars(state, action) {
            try {
                const similar = action.payload
                state.similars = similar
                console.log(state.similars);

            } catch (err) {
                return err
            }
        },
        singleProduct(state, action) {
            try {
                const oneProduct = state.filteredProducts.filter(
                    (product) => product.asin === action.payload
                );
                state.singleProduct = oneProduct;

            } catch (err) {
                return err;
            }
        },
        clearFilter(state) {
            state.filteredProducts = data
        }
    }
})


export const {
    getSimilars,
    singleProduct,
    clearFilter,
    filterAll
} = productSlice.actions;
export default productSlice.reducer;