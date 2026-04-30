import type { CheckoutBody } from "../types/checkoutBody.js";
import * as zod from 'zod'

// Function for validating checkout body
export const checkoutBodyValidator = (body: CheckoutBody) => {

    try {
        
        const object = zod.object({
            address: zod.string().trim().min(5).max(350),
            phoneNumber: zod.string().trim().max(10).min(10)
        })

        const fields = object.parse(body)
        return {success: true, fields: fields}

    } catch{
        return {success: false, error: "Invalid fields"}
    }

}