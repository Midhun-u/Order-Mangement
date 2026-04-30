import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { CartModel } from "../../models/cart.model.js";

// Controller for deleting cart item
export const deleteCartItemController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.params as {id: string}

    // Checking if cart item exists
    const cartItem = await CartModel.getCartItemById(id)
    if(!cartItem){
        reply.status(404)
        return {success: false, error: "Cart item is not found", statusCode: 404}
    }

    const deleteCount = await CartModel.deleteCartItemById(id)
    if(deleteCount){
        reply.status(200)
        return {success: true, message: "Cart item is deleted", statusCode: 200}
    }

    reply.status(400)
    return {success: false, error: "Cart item is couldn't delete", statusCode: 200}

}, "deleteCartItemController error")