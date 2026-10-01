import type { IPermissionRepository } from "@/src/application/interfaces/IPermissionRepository.js";
import { PermissionStatus } from "@/src/application/domain/enum.js";

interface ApplyPermissionData {
    employeeId: string;
    date: string;
    fromTime: string;
    toTime: string;
    reason: string;
}

export class ApplyPermission {
    constructor(
        private repository: IPermissionRepository
    ) {}

    async execute(
        data: ApplyPermissionData
    ) {
        if (!data.employeeId) {
            throw new Error(
                "Employee ID is required"
            );
        }

        if (!data.date) {
            throw new Error(
                "Date is required"
            );
        }

        if (!data.fromTime || !data.toTime) {
            throw new Error(
                "Permission time is required"
            );
        }

        if (
            !data.reason ||
            !data.reason.trim()
        ) {
            throw new Error(
                "Reason is required"
            );
        }

        return await this.repository.create({
            employeeId: data.employeeId,
            date: data.date,
            fromTime: data.fromTime,
            toTime: data.toTime,
            reason: data.reason.trim(),
            status: PermissionStatus.PENDING,
            rejectionReason: null
        });
    }
}