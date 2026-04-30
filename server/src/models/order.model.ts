import { Order } from "../schemas/order.schema.js"

// Order model
export const OrderModel = {

    addOrder: async (data: {
        userId: string,
        foodId: string,
        address: string,
        phoneNumber: string,
        price: number
    }) => {

        const newOrder = await Order.create({
            user_id: data.userId,
            food_id: data.foodId,
            address: data.address,
            phone_number: data.phoneNumber,
            price: data.price
        })

        return newOrder.dataValues

    }

}