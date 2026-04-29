import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { AuthBody } from "../../types/authBody.js";
import { authBodyValidator } from "../../validator/authBodyValidator.js";
import { UserModel } from "../../models/user.model.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { generateToken } from "../../utils/generateToken.js";
import { excludePassword } from "../../utils/excludePassword.js";

// Controller for login
export const loginController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const body = request.body as AuthBody || {}

    const validator = authBodyValidator(body, "login")
    if(!validator.success || !validator.fields || validator.error){
        reply.status(400)
        return {success: false, error: validator.error, statusCode: 400}
    }

    // Checking if user registered
    const user = await UserModel.getUserByEmailWithPassword(validator.fields.email)
    if(!user){
        reply.status(400)
        return {success: false, error: "Email or password is incorrect", statusCode: 400}
    }

    // Checking if password is correct
    const isPasswordCorrect = await comparePassword(validator.fields.password, user.password)
    if(!isPasswordCorrect){
        reply.status(400)
        return {success: false, error: "Email or password is incorrect", statusCode: 400}
    }

    const authToken = await generateToken(reply, user.id, user.email, user.fullname)
    return {success: true, message: "Login success", authToken: authToken, user: excludePassword(user)}

}, "loginController error")