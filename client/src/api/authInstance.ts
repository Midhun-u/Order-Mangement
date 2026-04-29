import { handlError } from "../utils/handleError";
import { authInstance } from "./axiosInstance";

// Api for signing
export const signApi = handlError(async (body: {
    email: string,
    fullname: string,
    password: string
}) => {

    const result = await authInstance.post("/sign", body)
    return result.data

})