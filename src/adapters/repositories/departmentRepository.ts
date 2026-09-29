import { AppDataSource } from "@/src/infrastructure/database.js";
import { Department } from "@/src/adapters/models/Department.js";
import type { IDepartmentRepository } from "@/src/application/interfaces/IDepartmentRepository.js";

export class DepartmentRepository implements IDepartmentRepository {
    private repository = AppDataSource.getRepository(Department);

    async create(data: Partial<Department>): Promise<Department> {
        const department = this.repository.create(data);
        return await this.repository.save(department);
    }

    async findAll(): Promise<Department[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<Department | null> {
        return await this.repository.findOne({
            where: { id },
            relations: {
                employees: true,
                designations: true
            }
        });
    }

    async findByCode(code: string): Promise<Department | null> {
        return await this.repository.findOne({
            where: { code },
            relations: {
                employees: true,
                designations: true
            }
        });
    }

    async findByName(name: string): Promise<Department | null> {
        return await this.repository.findOne({
            where: { name },
            relations: {
                employees: true,
                designations: true
            }
        });
    }

    async update(
        id: string,
        data: Partial<Department>
    ): Promise<Department> {
        await this.repository.update(id, data);
        const department = await this.findById(id);

        if (!department) {
            throw new Error("Department not found");
        }

        return department;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}