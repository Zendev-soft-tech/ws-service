import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "@/src/config/index.js";
import { UserRole } from "@/src/application/domain/enum.js";

export interface AuthRequest extends Request {
    employeeId?: string|undefined;
    role?: UserRole|undefined;
    organizationId?: string|undefined;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Authorization token required"
            });
        }

        const decoded = jwt.verify(
            token,
            config.jwtSecret
        ) as {
            employeeId: string;
            role: UserRole;
            organizationId?: string;
        };

        req.employeeId = decoded.employeeId;
        req.role = decoded.role;
        req.organizationId = decoded.organizationId;

        next();

    } catch {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};


export const hrAdminMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.role !== UserRole.ADMIN) {
        return res.status(403).json({
            message: "Admin access required"
        });
    }

    next();
};


export const employeeMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.role !== UserRole.EMPLOYEE) {
        return res.status(403).json({
            message: "Employee access required"
        });
    }

    next();
};