import fastifyPlugin from "fastify-plugin";
import { connectDb } from "./db.js";
import { corsPlugin } from "./cors.js";
import { jwtPlugin } from "./jwt.js";

// Plugin for registering all plugins
export const initPlugin = fastifyPlugin(async (fastify) => {

    // CORS plugin
    await fastify.register(corsPlugin)

    // Plugin for connecting database
    await fastify.register(connectDb)

    // Plugin for registering JWT
    await fastify.register(jwtPlugin)

})