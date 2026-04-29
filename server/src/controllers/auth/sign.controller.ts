import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthBody } from "../../types/authBody.js";
import { authBodyValidator } from "../../validator/authBodyValidator.js";

// Controller for signing
export const signController = (request: FastifyRequest, reply: FastifyReply) => {

    const body = request.body as AuthBody || {}

    const validator = authBodyValidator(body)
    if(!validator.success){
        reply.status(400)
        return {success: false, error: validator.error, statusCode: 400}
    }

}