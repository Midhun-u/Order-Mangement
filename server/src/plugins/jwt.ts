import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { envVariables } from "../utils/envVariables.js";

/// JWT plugin
export const jwtPlugin = fastifyPlugin(async (fastify) => {

    await fastify.register(fastifyJwt, {
        secret: envVariables.JWT_SECRET
    })

})