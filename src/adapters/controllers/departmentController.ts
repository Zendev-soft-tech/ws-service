import type { Request, Response } from "express";
import { DepartmentRepository } from "@/src/adapters/repositories/departmentRepository.js";
import { AddDepartment } from "@/src/application/usecases/department/AddDepartment.js";
import { GetDepartments } from "@/src/application/usecases/department/GetAllDepartments.js";
import { GetDepartmentById } from "@/src/application/usecases/department/GetDepartmentById.js";
import { GetDepartmentByCode } from "@/src/application/usecases/department/GetDepartmentByCode.js";
import { GetDepartmentByName } from "@/src/application/usecases/department/GetDepartmentByName.js";
import { UpdateDepartment } from "@/src/application/usecases/department/UpdateDepartment.js";
import { DeleteDepartment } from "@/src/application/usecases/department/DeleteDepartment.js";

const repository = new DepartmentRepository();
const add = new AddDepartment(repository);
const get = new GetDepartments(repository);
const getDepartmentById = new GetDepartmentById(repository);
const getDepartmentByCode = new GetDepartmentByCode(repository);
const getDepartmentByName = new GetDepartmentByName(repository);
const update = new UpdateDepartment(repository);
const remove = new DeleteDepartment(repository);

export const create = async (req: Request, res: Response) => {
    try {
        const result = await add.execute(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await get.execute();
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid department ID" });
        }

        const result = await getDepartmentById.execute(id);

        if (!result) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;

        if (!code || Array.isArray(code)) {
            return res.status(400).json({ message: "Invalid department code" });
        }

        const result = await getDepartmentByCode.execute(code);

        if (!result) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        if (!name || Array.isArray(name)) {
            return res.status(400).json({ message: "Invalid department name" });
        }

        const result = await getDepartmentByName.execute(name);

        if (!result) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid department ID" });
        }

        const result = await update.execute(id, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const removeDepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid department ID" });
        }

        const result = await remove.execute(id);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};