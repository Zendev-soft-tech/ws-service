import type { Request, Response } from "express";
import { SalaryRepository } from "@/src/adapters/repositories/salaryRepository.js";
import { AddSalary } from "@/src/application/usecases/salary/AddSalary.js";
import { GetSalary } from "@/src/application/usecases/salary/GetSalary.js";
import { UpdateSalary } from "@/src/application/usecases/salary/UpdateSalary.js";
import { DeleteSalary } from "@/src/application/usecases/salary/DeleteSalary.js";

const repository = new SalaryRepository();
const add = new AddSalary(repository);
const get = new GetSalary(repository);
const update = new UpdateSalary(repository);
const remove = new DeleteSalary(repository);

export const create = async (req: Request, res: Response) => {
    try {
        res.status(201).json(await add.execute(req.body));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getSalary = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;
        if (typeof employeeId !== "string") {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        res.json(await get.execute(employeeId));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSalary = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;
        if (typeof employeeId !== "string") {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        res.json(await update.execute(employeeId, req.body));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSalary = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;
        if (typeof employeeId !== "string") {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        res.json(await remove.execute(employeeId));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};