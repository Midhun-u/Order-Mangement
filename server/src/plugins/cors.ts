import fastifyPlugin from "fastify-plugin";
import cors from '@fastify/cors'
import { envVariables } from "../utils/envVariables.js";

// CORS Plugin
export const corsPlugin = fastifyPlugin(async (fastify) => {

    await fastify.register(cors, {
        origin: envVariables.APP_URL,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true
    })

})