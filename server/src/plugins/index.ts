import fastifyPlugin from "fastify-plugin";
import { connectDb } from "./db.js";
import { corsPlugin } from "./cors.js";

// Plugin for registering all plugins
export const initPlugin = fastifyPlugin(async (fastify) => {

    // Plugin for connecting database
    await fastify.register(connectDb)

    // CORS plugin
    await fastify.register(corsPlugin)

})