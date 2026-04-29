import type { FastifyInstance } from "fastify";
import { signController } from "../controllers/auth/sign.controller.js";
import { loginController } from "../controllers/auth/login.controller.js";
import { getProfileController } from "../controllers/auth/getProfile.controller.js";
import { authenticationHook } from "../hooks/auth.js";

// Auth routes
export const authRoutes = (fastify: FastifyInstance) => {

    // Route for sign
    fastify.post("/sign", signController)

    // Route for login
    fastify.post("/login", loginController)

    // Route for getting user profile
    fastify.get("/get-profile", {onRequest: authenticationHook}, getProfileController)

}