import type { CartBody } from "../types/cartBody.js";
import {Cart, Food, User} from '../schemas/index.js'
import { Op } from "sequelize";

// Cart model
export const CartModel = {

    addCart: async (data: CartBody & {userId: string, }) => {

        const newCartItem = await Cart.create({
            food_id: data.foodId,
            user_id: data.userId
        }, {returning: true})

        console.log(newCartItem.dataValues)

        return newCartItem.dataValues

    },

    getCartItemByFoodIdAndUserId: async (foodId: string, userId: string) => {

        const cartItem = await Cart.findOne({
            where: {
                [Op.and]: [{food_id: foodId}, {user_id: userId}]
            },
            nest: true
        })

        return cartItem

    },

    getCartCountByUserId: async ( userId: string ) => {

        const count = await Cart.count({
            where: {
                user_id: {
                    [Op.eq]: userId
                }
            }
        })
        
        return count

    },

    getCartItemById: async (id: string) => {

        const cartItem = await Cart.findByPk(id)
        return cartItem?.dataValues

    },

    updateCartItemById: async (id: string, data: Record<string, any> = {}) => {

        const [affectedCount] = await Cart.update(data, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return affectedCount

    },

    deleteCartItemById: async (id: string) => {

        const deleteCount = await Cart.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return deleteCount

    },

    getCartItemsByUserId: async (userId: string, page: number = 1, limit: number = 50) => {

        const cartItems = await Cart.findAll({
            where: {
                user_id: {
                    [Op.eq]: userId
                }
            },
            offset: (page - 1) * limit,
            limit: limit,
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ['id', 'email', 'fullname']
                },
                {
                    model: Food,
                    as: "food",
                    attributes: ['id', 'name', 'image_url', 'price']
                }
            ],
            nest: true,
            raw: true
        })

        return cartItems

    }

}