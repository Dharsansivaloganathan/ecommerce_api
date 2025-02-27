import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Forbidden. Admin access only." });
    return;
  }
  next();
};
