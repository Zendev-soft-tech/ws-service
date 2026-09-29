import type { Request, Response } from "express";
import { AttendanceRepository } from "@/src/adapters/repositories/attendanceRepository.js";
import { CheckIn } from "@/src/application/usecases/attendance/CheckIn.js";
import { CheckOut } from "@/src/application/usecases/attendance/CheckOut.js";
import { GetAttendance } from "@/src/application/usecases/attendance/GetAllAttendance.js";
import { GetEmployeeAttendance } from "@/src/application/usecases/attendance/GetEmployeeAttendance.js";

const repository = new AttendanceRepository();
const checkIn = new CheckIn(repository);
const checkOut = new CheckOut(repository);
const getAttendance = new GetAttendance(repository);
const getEmployeeAttendance = new GetEmployeeAttendance(repository);

export const checkInEmployee = async (req: Request, res: Response) => {
    try {
        const result = await checkIn.execute(req.body.employeeId);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const checkOutEmployee = async (req: Request, res: Response) => {
    try {
        const result = await checkOut.execute(req.body.employeeId);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await getAttendance.execute();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getByEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;

        if (!employeeId || Array.isArray(employeeId)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }

        const result = await getEmployeeAttendance.execute(employeeId);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};