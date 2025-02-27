"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/**
 * @route   POST /api/products
 * @desc    Create a new product (Admin only)
 */
router.post("/", productController_1.createProduct);
/**
 * @route   GET /api/products
 * @desc    Get all products
 */
router.get("/", productController_1.getProducts);
/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (Admin only)
 */
router.put("/:id", productController_1.updateProduct);
/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (Admin only)
 */
router.delete("/:id", productController_1.deleteProduct);
/**
 * @route   POST /api/products
 * @desc    Add a new product with image upload (Admin only)
 */
router.post("/", authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, uploadMiddleware_1.default.single("image"), productController_1.createProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map