import type { FastifyInstance } from "fastify";
import { authenticationHook } from "../hooks/auth.js";
import { getOrdersController } from "../controllers/order/getOrders.controller.js";

// Order routes
export const orderRoutes = (fastify: FastifyInstance) => {

    fastify.get("/get-orders", {onRequest: authenticationHook}, getOrdersController)

}