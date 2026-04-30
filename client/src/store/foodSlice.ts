import { createSlice } from "@reduxjs/toolkit";
import type { Food } from "../types/food";

type InitialState = {
    loading: boolean
    foods: Array<Food>
    errorMessage: string | null
    food: Food | null
}

const initialState: InitialState = {
    loading: false,
    foods: [],
    errorMessage: null,
    food: null
}

const foodSlice = createSlice({
    name: "food",
    initialState: initialState,
    reducers: {

        foodRequest: (state) => {
            state.loading = true
            state.errorMessage = null
        },

        foodSuccess: (state, action) => {
            state.loading = false
            state.food = action.payload.food? action.payload.food: null
            if(state.foods.length <= 0 || action.payload?.page === 1){
                state.foods = action.payload.foods
            }else if(action.payload?.foods?.length){
                state.foods = [...state.foods, ...action.payload.foods]
            }
        },

        foodFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const foodReducer = foodSlice.reducer
export const {foodFailed, foodRequest, foodSuccess} = foodSlice.actions