import {
    LeaveType,
    LeaveDayType,
    LeaveStatus
} from "@/src/application/domain/enum.js";
import type { ILeaveRepository } from "@/src/application/interfaces/ILeaveRepository.js";

interface ApplyLeaveData {
    employeeId: string;
    leaveType: LeaveType;
    dayType: LeaveDayType;
    fromDate: string;
    toDate: string;
    reason: string;
}

export class ApplyLeave {
    constructor(
        private leaveRepository: ILeaveRepository
    ) {}

    async execute(data: ApplyLeaveData) {
        if (!data.employeeId) {
            throw new Error("Employee ID is required");
        }

        if (!data.leaveType) {
            throw new Error("Leave type is required");
        }

        if (!data.dayType) {
            throw new Error("Day type is required");
        }

        if (!data.fromDate) {
            throw new Error("From date is required");
        }

        if (!data.toDate) {
            throw new Error("To date is required");
        }

        if (!data.reason || !data.reason.trim()) {
            throw new Error("Reason is required");
        }

        const fromDate = new Date(data.fromDate);
        const toDate = new Date(data.toDate);

        if (
            isNaN(fromDate.getTime()) ||
            isNaN(toDate.getTime())
        ) {
            throw new Error("Invalid date");
        }

        if (toDate < fromDate) {
            throw new Error(
                "To date cannot be before from date"
            );
        }

        const difference =
            toDate.getTime() -
            fromDate.getTime();

        const fullDays =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1;

        let days = fullDays;

        if (
            data.dayType === LeaveDayType.FIRST_HALF ||
            data.dayType === LeaveDayType.SECOND_HALF
        ) {
            days = fullDays * 0.5;
        }

        return await this.leaveRepository.create({
            employee: {
                id: data.employeeId
            } as any,

            leaveType: data.leaveType,

            dayType: data.dayType,

            fromDate: data.fromDate,

            toDate: data.toDate,

            days,

            reason: data.reason.trim(),

            status: LeaveStatus.PENDING,

            rejectionReason: null
        });
    }
}