import type { Leave } from "@/src/adapters/models/Leave.js";
import type { LeaveType } from "@/src/application/domain/enum.js";

export interface ILeaveRepository {
    create(data: Partial<Leave>): Promise<Leave>;
    findAll(): Promise<Leave[]>;
    findById(id: string): Promise<Leave | null>;
    findByEmployee(employeeId: string): Promise<Leave[]>;
    findByStatus(status: string): Promise<Leave[]>;
    update(id: string, data: Partial<Leave>): Promise<Leave>;
    delete(id: string): Promise<void>;
    getApprovedLeaveDays(employeeId: string, leaveType: LeaveType): Promise<number>;
}