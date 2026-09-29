import type { Department } from "@/src/adapters/models/Department.js";

export interface IDepartmentRepository {
    create(data: Partial<Department>): Promise<Department>;
    findAll(): Promise<Department[]>;
    findById(id: string): Promise<Department | null>;
    findByCode(code: string): Promise<Department | null>;
    findByName(name: string): Promise<Department | null>;
    update(id: string, data: Partial<Department>): Promise<Department>;
    delete(id: string): Promise<void>;
}