import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/productSlice';
import categorySlice from "./features/categorySlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categorySlice,
        cart: cartSlice
    },
})