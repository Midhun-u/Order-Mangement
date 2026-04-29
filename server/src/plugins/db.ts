import fastifyPlugin from "fastify-plugin";
import { connectDatabase } from "../config/sequelize.js";

// Plugin for connecting database
export const connectDb = fastifyPlugin(async (fastify) => {
    await fastify.register(connectDatabase)
})