import { handlError } from "../utils/handleError";
import { orderInstance } from "./axiosInstance";

// Api for getting orders
export const getOrdersApi = handlError(async (page: number, limit: number) => {

    const result = await orderInstance.get(`/get-orders?page=${page}&limit=${limit}`)
    return result.data

})