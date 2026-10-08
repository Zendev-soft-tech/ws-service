import { AppDataSource } from "@/src/infrastructure/database.js";
import { Employee } from "@/src/adapters/models/Employee.js";
import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class EmployeeRepository implements IEmployeeRepository {

    private repository = AppDataSource.getRepository(Employee);

    async create(data: Partial<Employee>): Promise<Employee> {
        return await this.repository.save(
            this.repository.create(data)
        );
    }

    async findAll(): Promise<Employee[]> {
        return await this.repository.find({
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true,
                organization: true
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
                reportingTo: true,
                organization: true
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
                reportingTo: true,
                organization: true
            }
        });
    }

    async findByNumber(
        employeeNumber: string
    ): Promise<Employee | null> {
        return await this.repository.findOne({
            where: { employeeNumber },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true,
                organization: true
            }
        });
    }

    async findByDepartment(
        departmentId: string
    ): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                department: { id: departmentId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true,
                organization: true
            }
        });
    }

    async findByDesignation(
        designationId: string
    ): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                designation: { id: designationId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true,
                organization: true
            }
        });
    }

    async findByLocation(
        locationId: string
    ): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                location: { id: locationId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true,
                organization: true
            }
        });
    }

    async findByOrganization(
        organizationId: string
    ): Promise<Employee[]> {
        return await this.repository.find({
            where: {
                organization: { orgId: organizationId }
            },
            relations: {
                department: true,
                designation: true,
                location: true,
                reportingTo: true,
                organization: true
            }
        });
    }

    async findByResetToken(
        token: string
    ): Promise<Employee | null> {
        return await this.repository.findOne({
            where: {
                resetPasswordToken: token
            }
        });
    }

    async update(
        id: string,
        data: Partial<Employee>
    ): Promise<Employee> {

        const employee =
            await this.repository.preload({
                id,
                ...data
            });

        if (!employee) {
            throw new Error("Employee not found");
        }

        return await this.repository.save(employee);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async generateEmployeeNumber(): Promise<string> {

    const employees = await this.repository.find({
        where: {},
        order: {
            employeeNumber: "DESC"
        }
    });

    const numbers = employees
        .map(employee => employee.employeeNumber)
        .filter((number): number is string =>
            !!number && /^EMP\d+$/.test(number)
        )
        .map(number =>
            parseInt(number.replace("EMP", ""), 10)
        );

    const nextNumber =
        numbers.length > 0
            ? Math.max(...numbers) + 1
            : 1;

    return `EMP${String(nextNumber).padStart(3, "0")}`;
}
}