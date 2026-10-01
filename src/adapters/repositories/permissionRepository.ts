import { AppDataSource } from "@/src/infrastructure/database.js";
import { Permission } from "@/src/adapters/models/Permission.js";
import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";

export class PermissionRepository implements IPermissionRepository {
    private repository =
        AppDataSource.getRepository(Permission);

    async create(
        data: Partial<Permission>
    ): Promise<Permission> {
        const permission =
            this.repository.create(data);

        return await this.repository.save(permission);
    }

    async findAll(): Promise<Permission[]> {
        return await this.repository.find({
            relations: {
                employee: true
            },
            order: {
                date: "DESC"
            }
        });
    }

    async findById(
        id: string
    ): Promise<Permission | null> {
        return await this.repository.findOne({
            where: { id },
            relations: {
                employee: true
            }
        });
    }

    async findByEmployee(
        employeeId: string
    ): Promise<Permission[]> {
        return await this.repository.find({
            where: { employeeId },
            relations: {
                employee: true
            },
            order: {
                date: "DESC"
            }
        });
    }

    async update(
        id: string,
        data: Partial<Permission>
    ): Promise<Permission> {
        await this.repository.update(id, data);

        const permission =
            await this.findById(id);

        if (!permission) {
            throw new Error(
                "Permission not found"
            );
        }

        return permission;
    }
}