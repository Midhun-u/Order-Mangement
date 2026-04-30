import { createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../types/cart";

type InitialState = {
    loading: boolean
    cartItem: Cart | null
    cartList: Array<Cart>
    errorMessage: string | null
}

const initialState: InitialState = {
    loading: false,
    cartItem: null,
    cartList: [],
    errorMessage: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {

        cartRequest: (state) => {
            state.loading = true
            state.errorMessage = null
        },

        cartSuccess: (state, action) => {
            state.loading = false
            state.cartItem = action.payload?.cartItem? action.payload.cartItem: null
            if(state.cartList.length <= 0 || action.payload?.page === 1){
                state.cartList = [...action.payload.cartList]
            }else if(action.payload?.cartList?.length){
                state.cartList = [...state.cartList, ...action.payload.cartList]
            }
        },

        cartFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload?.errorMessage
        }

    }
})

export const cartReducer = cartSlice.reducer
export const {cartFailed, cartRequest, cartSuccess} = cartSlice.actions