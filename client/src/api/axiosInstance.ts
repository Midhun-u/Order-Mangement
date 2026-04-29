import axios from "axios";
import { envVariables } from "../utils/envVariables";

const AUTH_BASE_URL = envVariables.AUTH_URL
const FOOD_BASE_URL = envVariables.FOOD_URL

// Auth Instance
export const authInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`
    }
})

// Food instance
export const foodInstance = axios.create({
    baseURL: FOOD_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`
    }
})