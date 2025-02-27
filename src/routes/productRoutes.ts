import express from "express";
import { 
  createProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController";
import upload from "../middleware/uploadMiddleware";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a new product (Admin only)
 * @access  Private (Admin)
 */
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Allows admin to add a new product with an optional image upload.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: The latest iPhone model
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: iPhone 15
 *                 description:
 *                   type: string
 *                   example: The latest iPhone model
 *                 price:
 *                   type: number
 *                   example: 999.99
 *                 stock:
 *                   type: integer
 *                   example: 10
 *                 categoryId:
 *                   type: integer
 *                   example: 1
 *                 imageUrl:
 *                   type: string
 *                   example: "https://res.cloudinary.com/demo/image/upload/iphone15.jpg"
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Only admins can create products
 */
router.post("/", authenticateUser, authorizeAdmin, upload.single("image"), createProduct);

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve all products with their categories.
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: iPhone 15
 *                   description:
 *                     type: string
 *                     example: The latest iPhone model
 *                   price:
 *                     type: number
 *                     example: 999.99
 *                   stock:
 *                     type: integer
 *                     example: 10
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Electronics
 *                   imageUrl:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/iphone15.jpg"
 */
router.get("/", getProducts);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (Admin only)
 * @access  Private (Admin)
 */
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     description: Allows admin to update product details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Upgraded version with ProMotion display
 *               price:
 *                 type: number
 *                 example: 1199.99
 *               stock:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Only admins can update products
 *       404:
 *         description: Product not found
 */
router.put("/:id", authenticateUser, authorizeAdmin, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (Admin only)
 * @access  Private (Admin)
 */
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     description: Allows admin to delete a product by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       403:
 *         description: Forbidden - Only admins can delete products
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authenticateUser, authorizeAdmin, deleteProduct);

export default router;
