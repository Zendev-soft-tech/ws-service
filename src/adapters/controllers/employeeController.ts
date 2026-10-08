import { Router, type Request, type Response } from "express";

import { EmployeeRepository } from "@/src/adapters/repositories/employeeRepository.js";

import { AddEmployee } from "@/src/application/usecases/employee/AddEmployee.js";
import { GetEmployees } from "@/src/application/usecases/employee/GetAllEmployees.js";
import { GetEmployeeById } from "@/src/application/usecases/employee/GetEmployeeById.js";
import { GetEmployeeByEmail } from "@/src/application/usecases/employee/GetEmployeeByEmail.js";
import { GetEmployeeByNumber } from "@/src/application/usecases/employee/GetEmployeeByNumber.js";
import { GetEmployeesByDepartment } from "@/src/application/usecases/employee/GetEmployeesByDepartment.js";
import { GetEmployeesByDesignation } from "@/src/application/usecases/employee/GetEmployeesByDesignation.js";
import { GetEmployeesByLocation } from "@/src/application/usecases/employee/GetEmployeesByLocation.js";
import { UpdateEmployee } from "@/src/application/usecases/employee/UpdateEmployee.js";
import { DeleteEmployee } from "@/src/application/usecases/employee/DeleteEmployee.js";

import { hrAdminMiddleware } from "@/src/frameworks/middleware.js";

export class EmployeeController {

    public router: Router = Router({ mergeParams: true });
    private employeeRepository = new EmployeeRepository();

    constructor() {
        this.router.post("/", hrAdminMiddleware, this.create.bind(this));
        this.router.get("/", this.getAll.bind(this));
        this.router.get("/email/:email", this.getByEmail.bind(this));
        this.router.get("/number/:employeeNumber", this.getByNumber.bind(this));
        this.router.get("/department/:departmentId", this.getByDepartment.bind(this));
        this.router.get("/designation/:designationId", this.getByDesignation.bind(this));
        this.router.get("/location/:locationId", this.getByLocation.bind(this));
        this.router.get("/:id", this.getById.bind(this));
        this.router.put("/:id", hrAdminMiddleware, this.update.bind(this));
        this.router.delete("/:id", hrAdminMiddleware, this.delete.bind(this));
    }

    async create(req: Request, res: Response) {
        try {
            const result = await new AddEmployee(this.employeeRepository)
                .execute(req.body);

            res.status(201).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await new GetEmployees(this.employeeRepository)
                .execute();

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(500).json({ ok: false, error: error.message });
        }
    }

    async getByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;

            if (!email || Array.isArray(email)) {
                res.status(400).json({ ok: false, error: "Invalid email" });
                return;
            }

            const result = await new GetEmployeeByEmail(this.employeeRepository)
                .execute(email);

            if (!result) {
                res.status(404).json({ ok: false, error: "Employee not found" });
                return;
            }

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async getByNumber(req: Request, res: Response) {
        try {
            const employeeNumber = req.params.employeeNumber;

            if (!employeeNumber || Array.isArray(employeeNumber)) {
                res.status(400).json({ ok: false, error: "Invalid employee number" });
                return;
            }

            const result = await new GetEmployeeByNumber(this.employeeRepository)
                .execute(employeeNumber);

            if (!result) {
                res.status(404).json({ ok: false, error: "Employee not found" });
                return;
            }

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async getByDepartment(req: Request, res: Response) {
        try {
            const id = req.params.departmentId;

            if (!id || Array.isArray(id)) {
                res.status(400).json({ ok: false, error: "Invalid department ID" });
                return;
            }

            const result = await new GetEmployeesByDepartment(this.employeeRepository)
                .execute(id);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async getByDesignation(req: Request, res: Response) {
        try {
            const id = req.params.designationId;

            if (!id || Array.isArray(id)) {
                res.status(400).json({ ok: false, error: "Invalid designation ID" });
                return;
            }

            const result = await new GetEmployeesByDesignation(this.employeeRepository)
                .execute(id);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async getByLocation(req: Request, res: Response) {
        try {
            const id = req.params.locationId;

            if (!id || Array.isArray(id)) {
                res.status(400).json({ ok: false, error: "Invalid location ID" });
                return;
            }

            const result = await new GetEmployeesByLocation(this.employeeRepository)
                .execute(id);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                res.status(400).json({ ok: false, error: "Invalid employee ID" });
                return;
            }

            const result = await new GetEmployeeById(this.employeeRepository)
                .execute(id);

            if (!result) {
                res.status(404).json({ ok: false, error: "Employee not found" });
                return;
            }

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                res.status(400).json({ ok: false, error: "Invalid employee ID" });
                return;
            }

            const result = await new UpdateEmployee(this.employeeRepository)
                .execute(id, req.body);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                res.status(400).json({ ok: false, error: "Invalid employee ID" });
                return;
            }

            const result = await new DeleteEmployee(this.employeeRepository)
                .execute(id);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(404).json({ ok: false, error: error.message });
        }
    }
}