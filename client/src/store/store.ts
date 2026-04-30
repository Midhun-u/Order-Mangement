import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { foodReducer } from "./foodSlice";
import { cartReducer } from "./cartSlice";
import { orderReducer } from "./orderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        food: foodReducer,
        cart: cartReducer,
        order: orderReducer
    }
})