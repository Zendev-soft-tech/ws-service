import type { Permission } from "../../adapters/models/Permission.js";

export interface IPermissionRepository {
    create(data: Partial<Permission>): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findById(id: string): Promise<Permission | null>;
    findByEmployee(employeeId: string): Promise<Permission[]>;
    update(
        id: string,
        data: Partial<Permission>
    ): Promise<Permission>;
}