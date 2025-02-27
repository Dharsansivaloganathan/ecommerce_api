"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
const Product_1 = __importDefault(require("./Product"));
class Cart extends sequelize_1.Model {
}
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtPurchase: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false, // Ensure price is always stored
    },
}, {
    sequelize: database_1.default,
    modelName: "Cart",
    tableName: "Carts",
});
Cart.belongsTo(User_1.default, { foreignKey: "userId" });
Cart.belongsTo(Product_1.default, { foreignKey: "productId" });
exports.default = Cart;
//# sourceMappingURL=Cart.js.map