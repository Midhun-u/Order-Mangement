import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { FoodModel } from "../../models/food.model.js";

// Controller for getting foods
export const getFoodsController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {page = 1, limit = 10} = request.query as {page: number, limit: number} || {}
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const foods = await FoodModel.getFoods(pageNumber, limitNumber)

    return {success: true, foods: foods, statusCode: 200}

}, "getFoodsController error")