import type { Employee } from "@/src/adapters/models/Employee.js";

export interface IEmployeeRepository {

    create(
        data: Partial<Employee>
    ): Promise<Employee>;

   findAll(): Promise<Employee[]>;


    findById(
        id: string
    ): Promise<Employee | null>;


    findByEmail(
        email: string
    ): Promise<Employee | null>;


    findByNumber(
        employeeNumber: string
    ): Promise<Employee | null>;


    findByDepartment(
        departmentId: string
    ): Promise<Employee[]>;


    findByDesignation(
        designationId: string
    ): Promise<Employee[]>;


    findByLocation(
        locationId: string
    ): Promise<Employee[]>;
    
    update(
        id: string,
        data: Partial<Employee>
    ): Promise<Employee>;

    delete(
        id: string
    ): Promise<void>;

    generateEmployeeNumber(): Promise<string>;
}