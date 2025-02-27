"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
/**
 * @route   POST /api/categories
 * @desc    Create a new category (Admin only)
 */
router.post("/", categoryController_1.createCategory);
/**
 * @route   GET /api/categories
 * @desc    Get all categories
 */
router.get("/", categoryController_1.getCategories);
/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category (Admin only)
 */
router.put("/:id", categoryController_1.updateCategory);
/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category (Admin only)
 */
router.delete("/:id", categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map