import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";

// Hook for checking if user authenticated
export const authenticationHook = async (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {

    try {
        
        await request.jwtVerify()
        done()

    } catch (error) {
        reply.status(401)
        return reply.send({success: false, error: "Unauthorized user", statusCode: 401})
    }

}