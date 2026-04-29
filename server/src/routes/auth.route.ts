import type { FastifyInstance } from "fastify";
import { signController } from "../controllers/auth/sign.controller.js";
import { loginController } from "../controllers/auth/login.controller.js";

// Auth routes
export const authRoutes = (fastify: FastifyInstance) => {

    // Route for sign
    fastify.post("/sign", signController)

    // Route for login
    fastify.post("/login", loginController)

}