import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/src/config/index.js";

export interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization token required" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token required" });
        }

        const decoded = jwt.verify(token, config.jwtSecret) as {
            userId: string;
            userRole: string;
        };

        req.userId = decoded.userId;
        req.userRole = decoded.userRole;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const hrAdminMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.userRole !== "HR Admin") {
        return res.status(403).json({
            message: "Only HR Admin can approve or reject leave"
        });
    }
    next();
};