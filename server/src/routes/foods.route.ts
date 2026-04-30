import type { FastifyInstance } from "fastify";
import { addFoodController } from "../controllers/foods/addFood.controller.js";
import { getFoodsController } from "../controllers/foods/getFoods.controller.js";
import { getFoodDetailsController } from "../controllers/foods/getFoodDetails.controller.js";

// Foods route
export const foodsRoute = (fastify: FastifyInstance) => {

    // Route for adding foods
    fastify.post("/add-food", addFoodController)

    // Route for getting foods
    fastify.get("/get-foods", getFoodsController)

    // Route for getting specific food details
    fastify.get("/get-food-details/:id", getFoodDetailsController)

}