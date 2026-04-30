import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Food } from "./food.schema.js";
import { User } from "./user.schema.js";

// Cart schema
export const Cart = sequelize.define("cart", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    food_id: {
        type: DataTypes.UUID,
        references: {
            model: Food,
            key: "id"
        },
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        }
    }
})