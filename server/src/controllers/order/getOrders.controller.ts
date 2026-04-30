import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { OrderModel } from "../../models/order.model.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";

// Controller for getting orders
export const getOrdersController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {page = 1, limit = 10} = request.query as {page: number, limit: number}
    const {id: userId} = request.user as JWT_PAYLOAD
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const orders = await OrderModel.getOrdersByUserId(userId, pageNumber, limitNumber)
    return {success: true, orders: orders, statusCode: 200}

}, "getOrdersController error")