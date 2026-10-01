import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";

export class GetPermissionById {
    constructor(
        private repository: IPermissionRepository
    ) {}

    async execute(id: string) {
        const permission =
            await this.repository.findById(id);

        if (!permission) {
            throw new Error(
                "Permission not found"
            );
        }

        return permission;
    }
}