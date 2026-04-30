import { handlError } from "../utils/handleError";
import { foodInstance } from "./axiosInstance";

// Api for getting foods
export const getFoodsApi = handlError(async (page: number = 1, limit: number = 10) => {

    const result = await foodInstance.get(`/get-foods?page=${page}&limit=${limit}`)
    return result.data

})

// Api for getting food details
export const getFoodDetailsApi = handlError(async (id: string) => {

    const result = await foodInstance.get(`/get-food-details/${id}`)
    return result.data

})