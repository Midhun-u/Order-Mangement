import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../types/order";

type InitialState = {
    loading: boolean
    orders: Array<Order>
    errorMessage: string | null
}

const initialState: InitialState = {
    loading: false,
    orders: [],
    errorMessage: null,
}

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {

        orderRequest: (state) => {
            state.loading = true
            state.errorMessage = null
        },

        orderSuccess: (state, action) => {
            state.loading = false
            if (state.orders.length <= 0 || action.payload?.page === 1) {
                state.orders = action.payload.orders
            } else if (action.payload?.orders?.length) {
                state.orders = [...state.orders, ...action.payload.orders]
            }
        },

        orderFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const orderReducer = orderSlice.reducer
export const { orderFailed, orderRequest, orderSuccess } = orderSlice.actions