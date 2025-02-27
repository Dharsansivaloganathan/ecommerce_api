import express from "express";
import { createOrder, getOrders, cancelOrder, updateOrder } from "../controllers/orderController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Place an order
 * @access  Private (Customer)
 */
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     description: Allows a logged-in user to place an order with the items in their cart.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 */

router.post("/", authenticateUser, createOrder);

/**
 * @route   GET /api/orders
 * @desc    Get order history (Customers: their own, Admin: all)
 * @access  Private
 */
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get order history
 *     tags: [Orders]
 *     description: Retrieve all past orders placed by the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: integer
 *                         example: 1
 *                       totalPrice:
 *                         type: number
 *                         example: 129.99
 *                       orderDate:
 *                         type: string
 *                         example: "2024-02-27T12:00:00Z"
 */
router.get("/", authenticateUser, getOrders);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Cancel an order
 * @access  Private (Customer)
 */
router.delete("/:id", authenticateUser, cancelOrder);

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status
 * @access  Private (Admin)
 */
router.put("/:id", authenticateUser, authorizeAdmin, updateOrder);

export default router;
