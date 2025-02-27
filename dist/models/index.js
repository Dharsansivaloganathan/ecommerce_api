"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = exports.Order = exports.Cart = exports.Product = exports.Category = exports.User = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Category_1 = __importDefault(require("./Category"));
exports.Category = Category_1.default;
const Product_1 = __importDefault(require("./Product"));
exports.Product = Product_1.default;
const Cart_1 = __importDefault(require("./Cart"));
exports.Cart = Cart_1.default;
const Order_1 = __importDefault(require("./Order"));
exports.Order = Order_1.default;
const OrderItem_1 = __importDefault(require("./OrderItem"));
exports.OrderItem = OrderItem_1.default;
// Define relationships
User_1.default.hasMany(Order_1.default, { foreignKey: "userId" });
Order_1.default.belongsTo(User_1.default, { foreignKey: "userId" });
Category_1.default.hasMany(Product_1.default, { foreignKey: "categoryId" });
Product_1.default.belongsTo(Category_1.default, { foreignKey: "categoryId" });
User_1.default.hasMany(Cart_1.default, { foreignKey: "userId" });
Cart_1.default.belongsTo(User_1.default, { foreignKey: "userId" });
Product_1.default.hasMany(Cart_1.default, { foreignKey: "productId" });
Cart_1.default.belongsTo(Product_1.default, { foreignKey: "productId" });
Order_1.default.hasMany(OrderItem_1.default, { foreignKey: "orderId" });
OrderItem_1.default.belongsTo(Order_1.default, { foreignKey: "orderId" });
Product_1.default.hasMany(OrderItem_1.default, { foreignKey: "productId" });
OrderItem_1.default.belongsTo(Product_1.default, { foreignKey: "productId" });
//# sourceMappingURL=index.js.map