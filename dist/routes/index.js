"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const router = express_1.default.Router();
// Base route for authentication
router.use("/auth", authRoutes_1.default);
// Base route for categories
router.use("/categories", categoryRoutes_1.default);
// Base route for products
router.use("/products", productRoutes_1.default);
// Base route for cart
router.use("/cart", cartRoutes_1.default);
// Base route for orders
router.use("/orders", orderRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map