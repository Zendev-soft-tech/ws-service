import type { Response } from "express";
import type { AuthRequest } from "@/src/frameworks/middleware.js";
import { PermissionRepository } from "@/src/adapters/repositories/permissionRepository.js";
import { ApplyPermission } from "@/src/application/usecases/permission/ApplyPermission.js";
import { GetPermissions } from "@/src/application/usecases/permission/GetPermissions.js";
import { GetPermissionById } from "@/src/application/usecases/permission/GetPermissionById.js";
import { GetPermissionsByEmployee } from "@/src/application/usecases/permission/GetPermissionsByEmployee.js";
import { ApprovePermission } from "@/src/application/usecases/permission/ApprovePermission.js";
import { RejectPermission } from "@/src/application/usecases/permission/RejectPermission.js";

const repository = new PermissionRepository();
const applyPermission = new ApplyPermission(repository);
const getPermissions = new GetPermissions(repository);
const getPermissionById = new GetPermissionById(repository);
const getPermissionsByEmployee = new GetPermissionsByEmployee(repository);
const approvePermission = new ApprovePermission(repository);
const rejectPermission = new RejectPermission(repository);

export const create = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.employeeId) {
            return res.status(401).json({ message: "Employee ID not found in token" });
        }
        const result = await applyPermission.execute({
            employeeId: req.employeeId,
            date: req.body.date,
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            reason: req.body.reason
        });
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAll = async (_req: AuthRequest, res: Response) => {
    try {
        const result = await getPermissions.execute();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid permission ID" });
        }
        const result = await getPermissionById.execute(id);
        res.json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getByEmployee = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.employeeId) {
            return res.status(401).json({ message: "Employee ID not found in token" });
        }
        const result = await getPermissionsByEmployee.execute(req.employeeId);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const approve = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid permission ID" });
        }
        const result = await approvePermission.execute(id);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const reject = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid permission ID" });
        }
        const result = await rejectPermission.execute(
            id,
            req.body.rejectionReason
        );
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};