import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { FoodBody } from "../../types/foodBody.js";
import { foodBodyValidator } from "../../validator/foodBodyValidator.js";
import { FoodModel } from "../../models/food.model.js";

// Controller for adding food
export const addFoodController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const body = request.body as FoodBody || {}

    const validator = foodBodyValidator(body)
    if(!validator.success || !validator.fields || validator.error){
        reply.status(400)
        return {success: false, error: validator.error, statusCode: 400}
    }

    const newFood = await FoodModel.addFood({
        name: validator.fields.name,
        description: validator.fields.description,
        price: validator.fields.price,
        imageUrl: validator.fields.imageUrl
    })

    if(newFood){
        reply.status(201)
        return {success: true, message: "Food is created", food: newFood, statusCode: 201}
    }

    reply.status(400)
    return {success: false, error: "Food is couldn't create", statusCode: 201}

}, "addFoodController error")