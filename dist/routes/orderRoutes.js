"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/**
 * @route   POST /api/orders
 * @desc    Place an order (Customer only)
 */
router.post("/", authMiddleware_1.authenticateUser, orderController_1.createOrder);
/**
 * @route   GET /api/orders
 * @desc    Get customer's order history
 */
router.get("/", authMiddleware_1.authenticateUser, orderController_1.getOrders);
/**
 * @route   GET /api/orders/all
 * @desc    Get all orders (Admin only)
 */
router.get("/all", authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, orderController_1.getAllOrders);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map