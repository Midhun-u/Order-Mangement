import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthBody } from "../../types/authBody.js";
import { authBodyValidator } from "../../validator/authBodyValidator.js";
import { handleError } from "../../utils/handleError.js";
import { UserModel } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/generateToken.js";

// Controller for signing
export const signController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const body = request.body as AuthBody || {}

    const validator = authBodyValidator(body)
    if (!validator.success || !validator.fields) {
        reply.status(400)
        return { success: false, error: validator.error, statusCode: 400 }
    }

    const user = await UserModel.getUserByEmail(validator.fields.email)
    if(user){
        reply.status(409)
        return {success: false, error: "This email is already registered", statusCode: 409}
    }

    const hashedPassword = await hashPassword(validator.fields.password)
    const newUser = await UserModel.addUser({
        fullname: validator.fields.fullname,
        email: validator.fields.email,
        password: hashedPassword
    })

    
    if(newUser){

        const authToken = await generateToken(reply, newUser.id, newUser.email, newUser.fullname)

        reply.status(201)
        return {success: true, message: "User is created", user: newUser, authToken: authToken, statusCode: 201}
    }

    reply.status(400)
    return {success: false, error: "Couldn't create user", statusCode: 400}

}, "signController error")