import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { User } from "./user.schema.js";
import { Food } from "./food.schema.js";

// Order schema
export const Order = sequelize.define("order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    food_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Food,
            key: "id"
        }
    },
    address: {
        type: DataTypes.STRING(350),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("ORDER_RECEIVED", "SHIPPED", "OUT_FOR_DELIVERY"),
        defaultValue: "ORDER_RECEIVED"
    }
})