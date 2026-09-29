import type { Request, Response } from "express";
import { LeaveRepository } from "@/src/adapters/repositories/leaveRepository.js";
import { ApplyLeave } from "@/src/application/usecases/leave/ApplyLeave.js";
import { GetLeaves } from "@/src/application/usecases/leave/GetLeaves.js";
import { GetLeaveById } from "@/src/application/usecases/leave/GetLeaveById.js";
import { GetLeavesByEmployee } from "@/src/application/usecases/leave/GetLeavesByEmployee.js";
import { GetLeavesByStatus } from "@/src/application/usecases/leave/GetLeavesByStatus.js";
import { ApproveLeave } from "@/src/application/usecases/leave/ApproveLeave.js";
import { RejectLeave } from "@/src/application/usecases/leave/RejectLeave.js";
import { GetLeaveBalance } from "@/src/application/usecases/leave/GetLeaveBalance.js";

const leaveRepository = new LeaveRepository();
const applyLeave = new ApplyLeave(leaveRepository);
const getLeaves = new GetLeaves(leaveRepository);
const getLeaveById = new GetLeaveById(leaveRepository);
const getLeavesByEmployee = new GetLeavesByEmployee(leaveRepository);
const getLeavesByStatus = new GetLeavesByStatus(leaveRepository);
const approveLeave = new ApproveLeave(leaveRepository);
const rejectLeave = new RejectLeave(leaveRepository);
const getLeaveBalance = new GetLeaveBalance(leaveRepository);

export const applyLeaveController = async (req: Request, res: Response) => {
    try {
        const { employeeId, leaveType, dayType, fromDate, toDate, reason } = req.body;
        const leave = await applyLeave.execute({ employeeId, leaveType, dayType, fromDate, toDate, reason });
        return res.status(201).json({ message: "Leave applied successfully", data: leave });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getLeavesController = async (req: Request, res: Response) => {
    try {
        const leaves = await getLeaves.execute();
        return res.status(200).json({ data: leaves });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLeaveByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid leave ID" });
        }
        const leave = await getLeaveById.execute(id);
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }
        return res.status(200).json({ data: leave });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getLeavesByEmployeeController = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;
        if (!employeeId || Array.isArray(employeeId)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        const leaves = await getLeavesByEmployee.execute(employeeId);
        return res.status(200).json({ data: leaves });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getLeavesByStatusController = async (req: Request, res: Response) => {
    try {
        const { status } = req.params;
        if (!status || Array.isArray(status)) {
            return res.status(400).json({ message: "Invalid leave status" });
        }
        const leaves = await getLeavesByStatus.execute(status);
        return res.status(200).json({ data: leaves });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const approveLeaveController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid leave ID" });
        }
        const leave = await approveLeave.execute(id);
        return res.status(200).json({ message: "Leave approved successfully", data: leave });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const rejectLeaveController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid leave ID" });
        }
        const { rejectionReason } = req.body;
        const leave = await rejectLeave.execute(id, rejectionReason);
        return res.status(200).json({ message: "Leave rejected successfully", data: leave });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getLeaveBalanceController = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;
        if (!employeeId || Array.isArray(employeeId)) {
            return res.status(400).json({ message: "Employee ID is required" });
        }
        const result = await getLeaveBalance.execute(employeeId);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};