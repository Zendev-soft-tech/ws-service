import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";

export class GetPermissions {
    constructor(
        private repository: IPermissionRepository
    ) {}

    async execute() {
        return await this.repository.findAll();
    }
}