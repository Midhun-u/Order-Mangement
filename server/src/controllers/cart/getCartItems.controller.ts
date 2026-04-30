import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { CartModel } from "../../models/cart.model.js";

// Controller for getting cart item list
export const getCartItemsController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.user as JWT_PAYLOAD
    const {page = 1, limit = 10} = request.query as {page: number, limit: number}
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const cartItems = await CartModel.getCartItemsByUserId(id, pageNumber, limitNumber)
    return {success: true, cartItems: cartItems, statusCode: 200}

}, "getCartItemsController error")