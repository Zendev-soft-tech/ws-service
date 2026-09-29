import { AppDataSource } from "@/src/infrastructure/database.js";
import { Employee } from "@/src/adapters/models/Employee.js";
import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class EmployeeRepository implements IEmployeeRepository {
    private repository = AppDataSource.getRepository(Employee);

    async create(data: Partial<Employee>): Promise<Employee> {
        const employee = this.repository.create(data);
        return await this.repository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return await this.repository.find({
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async findById(id: string): Promise<Employee | null> {
        return await this.repository.findOne({
            where: { id },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async findByEmail(email: string): Promise<Employee | null> {
        return await this.repository.findOne({
            where: { email },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async findByNumber(employeeNumber: string): Promise<Employee | null> {
        return await this.repository.findOne({
            where: { employeeNumber },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async findByDepartment(departmentId: string): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                department: { id: departmentId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async findByDesignation(designationId: string): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                designation: { id: designationId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async findByLocation(locationId: string): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                location: { id: locationId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true
            }
        });
    }

    async update(
    id: string,
    data: Partial<Employee>
): Promise<Employee> {
    const employee = await this.repository.preload({
        id,
        ...data
    });

    if (!employee) {
        throw new Error("Employee not found");
    }

    await this.repository.save(employee);

    const updatedEmployee = await this.findById(id);

    if (!updatedEmployee) {
        throw new Error("Employee not found");
    }

    return updatedEmployee;
}

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async generateEmployeeNumber(): Promise<string> {
        const employees = await this.repository.find({
            order: {
                employeeNumber: "DESC"
            },
            take: 1
        });

        if (employees.length === 0) {
            return "EMP001";
        }

        const lastNumber = parseInt(
            employees[0]!.employeeNumber.replace("EMP", ""),
            10
        );

        return `EMP${String(lastNumber + 1).padStart(3, "0")}`;
    }
}