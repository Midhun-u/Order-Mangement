import { handlError } from "../utils/handleError";
import { cartInstance } from "./axiosInstance";

// Api for adding food to cart 
export const addFoodToCartApi = handlError(async (data: {foodId: string}) => {

    const result = await cartInstance.post("/add-cart", data)
    return result.data

})

// Api for getting cart item
export const getCartItemApi = handlError(async (foodId: string) => {

    const result = await cartInstance.get(`/get-cart-item/${foodId}`)
    return result.data

})

// Api for getting cart list
export const getCartListApi = handlError(async (page: number = 1, limit: number = 10) => {

    const result = await cartInstance.get(`/get-cart-items?page=${page}&limit=${limit}`)
    return result.data

})

// Api for updating cart item
export const updateCartItemApi = handlError(async (id: string, type: "increment" | "decrement") => {

    const result = await cartInstance.patch(`/update-cart-item/${id}/${type}`)
    return result.data

})

// Api for deleting cart item
export const deleteCartItemApi = handlError(async (id) => {

    const result = await cartInstance.delete(`/delete-cart-item/${id}`)
    return result.data

})