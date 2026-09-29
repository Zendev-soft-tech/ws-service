import { AppDataSource } from "@/src/infrastructure/database.js";
import { Employee } from "@/src/adapters/models/Employee.js";
import type { EmployeeSalary } from "@/src/adapters/models/Employee.js";
import type { ISalaryRepository } from "@/src/application/interfaces/ISalaryRepository.js";

export class SalaryRepository implements ISalaryRepository {
    private repository = AppDataSource.getRepository(Employee);

    async create(employeeId: string, salary: EmployeeSalary): Promise<EmployeeSalary> {
        const employee = await this.repository.findOne({ where: { id: employeeId } });
        if (!employee) throw new Error("Employee not found");
        employee.salary = salary;
        await this.repository.save(employee);
        return employee.salary;
    }

    async findByEmployee(employeeId: string): Promise<EmployeeSalary | null> {
        const employee = await this.repository.findOne({ where: { id: employeeId } });
        if (!employee) return null;
        return employee.salary;
    }

    async update(employeeId: string, salary: EmployeeSalary): Promise<EmployeeSalary> {
        const employee = await this.repository.findOne({ where: { id: employeeId } });
        if (!employee) throw new Error("Employee not found");
        employee.salary = salary;
        await this.repository.save(employee);
        return employee.salary;
    }

    async delete(employeeId: string): Promise<void> {
        const employee = await this.repository.findOne({ where: { id: employeeId } });
        if (!employee) throw new Error("Employee not found");
        employee.salary = null;
        await this.repository.save(employee);
    }
}