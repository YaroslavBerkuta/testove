import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secret_key",
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }
      req.user = decoded;
      next();
    }
  );
};
