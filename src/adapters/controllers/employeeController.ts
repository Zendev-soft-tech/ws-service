import type { Request, Response } from "express";
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
import { DeleteEmployee } from "@/src/application/usecases/employee/deleteEmployee.js";

const repository = new EmployeeRepository();
const addEmployee = new AddEmployee(repository);
const getEmployees = new GetEmployees(repository);
const getEmployee = new GetEmployeeById(repository);
const getEmployeeByEmail = new GetEmployeeByEmail(repository);
const getEmployeeByNumber = new GetEmployeeByNumber(repository);
const getEmployeesByDepartment = new GetEmployeesByDepartment(repository);
const getEmployeesByDesignation = new GetEmployeesByDesignation(repository);
const getEmployeesByLocation = new GetEmployeesByLocation(repository);
const updateEmployee = new UpdateEmployee(repository);
const deleteEmployee = new DeleteEmployee(repository);

export const create = async (req: Request, res: Response) => {
    try {
        const employee = await addEmployee.execute(req.body);
        res.status(201).json(employee);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const employees = await getEmployees.execute();
        res.json(employees);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        const employee = await getEmployee.execute(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        if (!email || Array.isArray(email)) {
            return res.status(400).json({ message: "Invalid employee email" });
        }
        const employee = await getEmployeeByEmail.execute(email);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByNumber = async (req: Request, res: Response) => {
    try {
        const { employeeNumber } = req.params;
        if (!employeeNumber || Array.isArray(employeeNumber)) {
            return res.status(400).json({ message: "Invalid employee number" });
        }
        const employee = await getEmployeeByNumber.execute(employeeNumber);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
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
        const employees = await getEmployeesByDepartment.execute(departmentId);
        res.json(employees);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByDesignation = async (req: Request, res: Response) => {
    try {
        const { designationId } = req.params;
        if (!designationId || Array.isArray(designationId)) {
            return res.status(400).json({ message: "Invalid designation ID" });
        }
        const employees = await getEmployeesByDesignation.execute(designationId);
        res.json(employees);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByLocation = async (req: Request, res: Response) => {
    try {
        const { locationId } = req.params;
        if (!locationId || Array.isArray(locationId)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }
        const employees = await getEmployeesByLocation.execute(locationId);
        res.json(employees);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        const employee = await updateEmployee.execute(id, req.body);
        res.json(employee);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        const result = await deleteEmployee.execute(id);
        res.json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};