import type { FastifyReply } from "fastify";

// Function for generating token
export const generateToken = async (reply: FastifyReply, id: string, email: string, fullname: string) => {

    const authToken = await reply.jwtSign({
        id: id,
        email: email,
        fullname: fullname
    })

    return authToken

}