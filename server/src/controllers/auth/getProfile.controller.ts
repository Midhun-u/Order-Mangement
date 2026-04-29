import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { UserModel } from "../../models/user.model.js";

// Controller for getting user profile
export const getProfileController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.user as JWT_PAYLOAD

    if(!id){
        reply.status(400)
        return {success: false, error: "User is missing", statusCode: 400}
    }

    const user = await UserModel.getUserById(id)
    if(!user){
        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}
    }

    return {success: true, user: user, statusCode: 200}

}, "getProfileController error")