import type { EmployeeSalary } from "@/src/adapters/models/Employee.js";

export interface ISalaryRepository {
    create(
        employeeId: string,
        salary: EmployeeSalary
    ): Promise<EmployeeSalary>;

    findByEmployee(
        employeeId: string
    ): Promise<EmployeeSalary | null>;

    update(
        employeeId: string,
        salary: EmployeeSalary
    ): Promise<EmployeeSalary>;

    delete(
        employeeId: string
    ): Promise<void>;
}