import type { Request, Response } from "express";
import { DesignationRepository } from "@/src/adapters/repositories/designationRepository.js";
import { AddDesignation } from "@/src/application/usecases/designation/AddDesignation.js";
import { GetDesignations } from "@/src/application/usecases/designation/GetAllDesignations.js";
import { GetDesignationById } from "@/src/application/usecases/designation/GetDesignationById.js";
import { GetDesignationByCode } from "@/src/application/usecases/designation/GetDesignationByCode.js";
import { GetDesignationByName } from "@/src/application/usecases/designation/GetDesignationByName.js";
import { GetDesignationsByDepartment } from "@/src/application/usecases/designation/GetDesignationsByDepartment.js";
import { UpdateDesignation } from "@/src/application/usecases/designation/UpdateDesignation.js";
import { DeleteDesignation } from "@/src/application/usecases/designation/DeleteDesignation.js";

const repository = new DesignationRepository();
const add = new AddDesignation(repository);
const get = new GetDesignations(repository);
const getDesignationById = new GetDesignationById(repository);
const getDesignationByCode = new GetDesignationByCode(repository);
const getDesignationByName = new GetDesignationByName(repository);
const getDesignationsByDepartment = new GetDesignationsByDepartment(repository);
const update = new UpdateDesignation(repository);
const remove = new DeleteDesignation(repository);

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
            return res.status(400).json({ message: "Invalid designation ID" });
        }

        const result = await getDesignationById.execute(id);

        if (!result) {
            return res.status(404).json({ message: "Designation not found" });
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
            return res.status(400).json({ message: "Invalid designation code" });
        }

        const result = await getDesignationByCode.execute(code);

        if (!result) {
            return res.status(404).json({ message: "Designation not found" });
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
            return res.status(400).json({ message: "Invalid designation name" });
        }

        const result = await getDesignationByName.execute(name);

        if (!result) {
            return res.status(404).json({ message: "Designation not found" });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentId } = req.params;

        if (!departmentId || Array.isArray(departmentId)) {
            return res.status(400).json({ message: "Invalid department ID" });
        }

        const result = await getDesignationsByDepartment.execute(departmentId);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDesignation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid designation ID" });
        }

        const result = await update.execute(id, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const removeDesignation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid designation ID" });
        }

        const result = await remove.execute(id);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};