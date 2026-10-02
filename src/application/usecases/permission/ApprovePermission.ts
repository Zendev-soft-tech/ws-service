import {PermissionStatus} from "@/src/application/domain/enum.js";
import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";

export class ApprovePermission {
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

        if (
            permission.status !==
            PermissionStatus.PENDING
        ) {
            throw new Error(
                "Only pending permission can be approved"
            );
        }

        return await this.repository.update(id, {
            status: PermissionStatus.APPROVED,
            rejectionReason: null
        });
    }
}