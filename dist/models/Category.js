"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Category extends sequelize_1.Model {
}
Category.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    description: { type: sequelize_1.DataTypes.TEXT },
}, { sequelize: database_1.default, modelName: "category" });
exports.default = Category;
//# sourceMappingURL=Category.js.map