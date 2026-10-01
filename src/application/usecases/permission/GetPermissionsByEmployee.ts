import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";

export class GetPermissionsByEmployee {
    constructor(
        private repository: IPermissionRepository
    ) {}

    async execute(employeeId: string) {
        return await this.repository.findByEmployee(
            employeeId
        );
    }
}