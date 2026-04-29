import type { FoodBody } from "../types/foodBody.js"
import * as zod from 'zod'

// Function for validating food body
export const foodBodyValidator = (body: FoodBody) => {

    try {
        
        const object = zod.object({
            name: zod.string().trim().min(3).max(100),
            description: zod.string().trim().min(10).max(500),
            imageUrl: zod.string().nonempty(),
            price: zod.number().min(1)
        })

        const fields = object.parse(body)
        return {success: true, fields: fields}

    } catch {
        return {success: false, error: "Invalid fields"}
    }

}