import express from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";


const router = express.Router();

// Base route for authentication
router.use("/auth", authRoutes);

// Base route for categories
router.use("/categories", categoryRoutes);

// Base route for products
router.use("/products", productRoutes);

// Base route for cart
router.use("/cart", cartRoutes);


// Base route for orders
router.use("/orders", orderRoutes);

export default router;
