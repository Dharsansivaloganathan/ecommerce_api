import express from "express";
import { addProductToCart, viewCart, removeCartItem } from "../controllers/cartController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route   POST /api/cart
 * @desc    Add a product to cart
 * @access  Private (Customer)
 */
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     description: Allows a logged-in customer to add a product to their shopping cart.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart
 */
router.post("/", authenticateUser, addProductToCart);

/**
 * @route   GET /api/cart
 * @desc    View cart
 * @access  Private (Customer)
 */
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     description: Retrieve all products added to the shopping cart for a logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       productId:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         example: 49.99
 */
router.get("/", authenticateUser, viewCart);

/**
 * @route   DELETE /api/cart/:productId
 * @desc    Remove a product from cart
 * @access  Private (Customer)
 */
/**
 * @swagger
 * /api/cart/{cartItemId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     description: Allows a logged-in user to remove a product from their shopping cart.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart item to remove
 *     responses:
 *       200:
 *         description: Product removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from cart
 */
router.delete("/:productId", authenticateUser, removeCartItem);

export default router;
