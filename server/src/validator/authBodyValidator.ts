import type { AuthBody } from "../types/authBody.js"
import * as zod from 'zod'

// Function for validating auth body
export const authBodyValidator = (body: AuthBody) => {

    try {
        
        const object = zod.object({
            fullname: zod.string().min(3).max(30),
            email: zod.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // testing email by email regex
            password: zod.string().min(6).max(50)
        })

        const fields = object.parse(body)
        return {success: true, fields: fields}

    } catch (error) {
        return {success: false, error: "Invalid fields"}
    }

}