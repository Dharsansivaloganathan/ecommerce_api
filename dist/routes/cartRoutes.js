"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/**
 * @route   POST /api/cart
 * @desc    Add product to cart (Customer only)
 */
router.post("/", authMiddleware_1.authenticateUser, cartController_1.addToCart);
/**
 * @route   GET /api/cart
 * @desc    Get cart items (Customer only)
 */
router.get("/", authMiddleware_1.authenticateUser, cartController_1.getCart);
/**
 * @route   DELETE /api/cart/:id
 * @desc    Remove an item from the cart (Customer only)
 */
router.delete("/:id", authMiddleware_1.authenticateUser, cartController_1.removeFromCart);
/**
 * @route   DELETE /api/cart
 * @desc    Clear the entire cart (Customer only)
 */
router.delete("/", authMiddleware_1.authenticateUser, cartController_1.clearCartItems);
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map