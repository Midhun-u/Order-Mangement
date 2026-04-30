import type { FastifyInstance } from "fastify";
import { addCartController } from "../controllers/cart/addCart.controller.js";
import { authenticationHook } from "../hooks/auth.js";
import { getCartItemController } from "../controllers/cart/getCartItem.controller.js";
import { updateCartController } from "../controllers/cart/updateCart.controller.js";
import { deleteCartItemController } from "../controllers/cart/deleteCart.controller.js";
import { getCartItemsController } from "../controllers/cart/getCartItems.controller.js";

// Cart routes
export const cartRoutes = (fastify: FastifyInstance) => {

    // Route for adding food to cart
    fastify.post("/add-cart", {onRequest: authenticationHook}, addCartController)

    // Route for getting specific cart item
    fastify.get("/get-cart-item/:foodId", {onRequest: authenticationHook}, getCartItemController)
    
    // Route for getting cart items
    fastify.get("/get-cart-items", {onRequest: authenticationHook}, getCartItemsController)

    // Route for updating cart item
    fastify.patch("/update-cart-item/:id/:type", {onRequest: authenticationHook}, updateCartController)

    // Route for deleting cart item
    fastify.delete("/delete-cart-item/:id", {onRequest: authenticationHook}, deleteCartItemController)

}