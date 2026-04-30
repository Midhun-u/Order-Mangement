import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { CartModel } from "../../models/cart.model.js";

// Controller updating cart item
export const updateCartController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.params as {id: string}

    // Checking if cart item exists
    const cartItem = await CartModel.getCartItemById(id)
    if(!cartItem){
        reply.status(404)
        return {success: false, error: "Cart item is not found", statusCode: 404}
    }

    const affectedCount = await CartModel.updateCartItemById(id, {
        quantity: cartItem.quantity + 1
    })

    if(affectedCount){
        reply.status(200)
        return {success: true, message: "Cart item count is incremented", statusCode: 200}
    }

    reply.status(400)
    return {success: false, error: "Couldnt' update cart item", statusCode: 200}

}, "updateCartController error")