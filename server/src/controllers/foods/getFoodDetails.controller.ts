import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { FoodModel } from "../../models/food.model.js";

// Controller for getting specific food details
export const getFoodDetailsController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.params as {id: string}

    const food = await FoodModel.getFoodById(id)
    return {success: true, food: food, statusCode: 200}

}, "getFoodController error")