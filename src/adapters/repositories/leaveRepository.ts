import { AppDataSource } from "@/src/infrastructure/database.js";
import { Leave } from "@/src/adapters/models/Leave.js";
import type { ILeaveRepository } from "@/src/application/interfaces/ILeaveRepository.js";
import { LeaveType, LeaveStatus } from "@/src/application/domain/enum.js";

export class LeaveRepository implements ILeaveRepository {
    private repository = AppDataSource.getRepository(Leave);

    async create(data: Partial<Leave>): Promise<Leave> {
        const leave = this.repository.create(data);
        return await this.repository.save(leave);
    }

    async findAll(): Promise<Leave[]> {
        return await this.repository.find({
            relations: { employee: true },
            order: { fromDate: "DESC" }
        });
    }

    async findById(id: string): Promise<Leave | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { employee: true }
        });
    }

    async findByEmployee(employeeId: string): Promise<Leave[]> {
        return await this.repository.find({
            where: { employee: { id: employeeId } },
            relations: { employee: true },
            order: { fromDate: "DESC" }
        });
    }

    async findByStatus(status: string): Promise<Leave[]> {
        return await this.repository.find({
            where: { status: status as LeaveStatus },
            relations: { employee: true },
            order: { fromDate: "DESC" }
        });
    }

    async update(
        id: string,
        data: Partial<Leave>
    ): Promise<Leave> {
        await this.repository.update(id, data);

        const updatedLeave =
            await this.findById(id);

        if (!updatedLeave) {
            throw new Error("Leave not found");
        }

        return updatedLeave;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async getApprovedLeaveDays(
        employeeId: string,
        leaveType: LeaveType
    ): Promise<number> {
        const leaves =
            await this.repository.find({
                where: {
                    employee: { id: employeeId },
                    leaveType,
                    status: LeaveStatus.APPROVED
                }
            });

        return leaves.reduce(
            (total, leave) => total + leave.days,
            0
        );
    }
}