import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import type { CheckoutBody } from "../../types/checkoutBody.js";
import { checkoutBodyValidator } from "../../validator/checkoutBodyValidator.js";
import { CartModel } from "../../models/cart.model.js";
import { OrderModel } from "../../models/order.model.js"

// Controller for checkout cart
export const checkoutCartController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id: userId} = request.user as JWT_PAYLOAD
    const body = request.body as CheckoutBody

    const validator = checkoutBodyValidator(body)
    if(!validator.success || !validator.fields || validator.error){
        reply.status(400)
        return {success: false, error: "Invalid fields", statusCode: 400}
    }

    const cart = await CartModel.getCartItemsByUserId(userId)
    if(!cart.length){
        reply.status(404)
        return {success: false, error: "User don't have cart items", statusCode: 404}
    }
    
    const results = await Promise.all(cart.map(async (item: any) => {

        const newOrder = await OrderModel.addOrder({
            userId: userId,
            foodId: item.food_id,
            address: validator.fields.address,
            phoneNumber: validator.fields.phoneNumber,
            price: item.quantity * item.food.price,
            quantity: item.quantity
        })

        if(newOrder){
            await CartModel.deleteCartItemById(item.id)
        }

        if(newOrder){
            return true
        }else{
            return false
        }

    }) || [])

   if(results.some(result => !result)){
        reply.status(400)
        return {success: false, error: "Couldn't order food", statusCode: 400}
   } 

   return {success: true, message: "Checkouted", statusCode: 200}

}, "checkoutCartController error")