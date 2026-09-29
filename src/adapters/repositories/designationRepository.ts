import { AppDataSource } from "@/src/infrastructure/database.js";
import { Designation } from "@/src/adapters/models/Designation.js";
import type { IDesignationRepository } from "@/src/application/interfaces/IDesignationRepository.js";

export class DesignationRepository implements IDesignationRepository {
    private repository = AppDataSource.getRepository(Designation);

    async create(data: Partial<Designation>): Promise<Designation> {
        const designation = this.repository.create(data);
        return await this.repository.save(designation);
    }

    async findAll(): Promise<Designation[]> {
        return await this.repository.find({
            relations: { department: true}
        });
    }

    async findById(id: string): Promise<Designation | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { department: true}
        });
    }

    async findByCode(code: string): Promise<Designation | null> {
        return await this.repository.findOne({
            where: { code },
            relations: { department: true }
        });
    }

    async findByName(name: string): Promise<Designation | null> {
        return await this.repository.findOne({
            where: { name },
            relations: { department: true}
        });
    }

    async findByDepartment(departmentId: string): Promise<Designation[]> {
        return await this.repository.find({
            where: { department: { id: departmentId } },
            relations: { department: true }
        });
    }

    async update(id: string, data: Partial<Designation>): Promise<Designation> {
        await this.repository.update(id, data);
        const designation = await this.findById(id);
        if (!designation) throw new Error("Designation not found");
        return designation;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}