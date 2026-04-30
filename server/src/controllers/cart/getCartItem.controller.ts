import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { CartModel } from "../../models/cart.model.js";

// Controller for getting specific cart item
export const getCartItemController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {foodId} = request.params as {foodId: string}
    const {id} = request.user as JWT_PAYLOAD

    const cartItem = await CartModel.getCartItemByFoodIdAndUserId(foodId, id)
    return {success: true, cartItem: cartItem, statusCode: 200}

}, "getCartItemController error")