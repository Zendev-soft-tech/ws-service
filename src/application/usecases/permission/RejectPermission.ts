import {
    PermissionStatus
} from "@/src/application/domain/enum.js";
import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";

export class RejectPermission {
    constructor(
        private repository: IPermissionRepository
    ) {}

    async execute(
        id: string,
        rejectionReason: string
    ) {
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
                "Only pending permission can be rejected"
            );
        }

        if (
            !rejectionReason ||
            !rejectionReason.trim()
        ) {
            throw new Error(
                "Rejection reason is required"
            );
        }

        return await this.repository.update(id, {
            status: PermissionStatus.REJECTED,
            rejectionReason:
                rejectionReason.trim()
        });
    }
}