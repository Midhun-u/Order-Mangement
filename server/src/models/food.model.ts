import { Food } from "../schemas/food.schema.js";
import type { FoodBody } from "../types/foodBody.js";

// Food model
export const FoodModel = {

    addFood: async (data: FoodBody) => {

        const newFood = await Food.create({
            name: data.name.trim(),
            description: data.description.trim(),
            price: data.price,
            image_url: data.imageUrl.trim()
        }, {returning: true})

        return newFood.dataValues

    },

    getFoods: async (page: number, limit: number) => {

        const foods = await Food.findAll({
            attributes: {
                exclude: ["description"]
            },
            offset: (page - 1) * limit,
            limit: limit,
            raw: true,
            nest: true
        })

        return foods

    },

    getFoodById: async (id: string) => {

        const food = await Food.findByPk(id, {
            nest: true,
        })

        return food?.dataValues

    }

}