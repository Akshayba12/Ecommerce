import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/useSlicer.ts'
import productReducer from './product/productsReducer.ts'
import searchProductsReducer from "./product/searchReducer.ts";
import cartReducer from './cart/cartReducer.ts'


const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        product: productReducer,
        searchProduct: searchProductsReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export default store;