import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// Food schema
export const Food = sequelize.define("food", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER({zerofill: false}),
        allowNull: false
    }
}, {tableName: "foods"})