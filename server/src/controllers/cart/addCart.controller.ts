import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import type { CartBody } from "../../types/cartBody.js";
import { CartModel } from "../../models/cart.model.js";

// Controller for adding food to cart
export const addCartController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.user as JWT_PAYLOAD
    const {foodId} = request.body as CartBody

    if(!foodId){
        reply.status(400)
        return {success: false, error: "All fields are required", statusCode: 400}
    }

    // Checking if cart item is already added
    const cartItem = await CartModel.getCartItemByFoodIdAndUserId(foodId, id)
    if(cartItem){
        reply.status(409)
        return {success: false, error: "Cart item is already added", statusCode: 409}
    }

    // Checking if user cart limit exceeded or not
    const limit = await CartModel.getCartCountByUserId(id)
    if(limit >= 50){
        reply.status(403)
        return {success: false, error: "User cart limit is exceeded", statusCode: 403}
    }

    const newCartItem = await CartModel.addCart({
        foodId: foodId,
        userId: id
    })

    if(newCartItem){
        reply.status(201)
        return {success: true, message: "Food added to cart", cartItem: newCartItem, statusCode: 201}
    }

    reply.status(400)
    return {success: false, error: "Couldn't add food to cart", statusCode: 400}

}, "addCartController error")