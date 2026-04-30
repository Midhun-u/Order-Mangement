import { Cart } from "./cart.schema.js";
import { User } from "./user.schema.js";
import { Food } from "./food.schema.js";

User.hasMany(Cart, {
    foreignKey: "user_id"
})
Food.hasMany(Cart, {
    foreignKey: "food_id"
})

Cart.belongsTo(User, {
    foreignKey: "user_id"
})
Cart.belongsTo(Food, {
    foreignKey: "food_id"
})

export {
    Cart,
    User,
    Food
}