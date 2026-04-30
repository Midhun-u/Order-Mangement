import { Op } from "sequelize"
import { Order } from "../schemas/order.schema.js"
import { User } from "../schemas/user.schema.js"
import { Food } from "../schemas/food.schema.js"

// Order model
export const OrderModel = {

    addOrder: async (data: {
        userId: string,
        foodId: string,
        address: string,
        phoneNumber: string,
        price: number,
        quantity: number
    }) => {

        const newOrder = await Order.create({
            user_id: data.userId,
            food_id: data.foodId,
            address: data.address,
            phone_number: data.phoneNumber,
            price: data.price,
            quantity: data.quantity
        })

        return newOrder.dataValues

    },

    getOrdersByUserId: async (userId: string, page: number, limit: number) => {

        const orders = await Order.findAll({
            where: {
                user_id: {
                    [Op.eq]: userId
                }
            },
            limit: limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ['id', 'fullname', 'email']
                },
                {
                    model: Food,
                    as: "food",
                    attributes: ['id', 'image_url', 'name']
                }
            ]
        })

        return orders

    }

}