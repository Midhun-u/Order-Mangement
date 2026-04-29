import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// User schema
export const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(350),
        allowNull: false,
        unique: "user_unique_email"
    },
    password: {
        type: DataTypes.TEXT(),
        allowNull: false,
    }
})