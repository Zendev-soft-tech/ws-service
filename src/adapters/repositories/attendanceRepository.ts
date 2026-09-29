import { AppDataSource } from "@/src/infrastructure/database.js";
import { Attendance } from "@/src/adapters/models/Attendance.js";
import { AttendanceStatus } from "@/src/application/domain/enum.js";
import type { IAttendanceRepository } from "@/src/application/interfaces/IAttendanceRepository.js";

export class AttendanceRepository implements IAttendanceRepository {
    private repository = AppDataSource.getRepository(Attendance);

    async create(data: Partial<Attendance>): Promise<Attendance> {
        const attendance = this.repository.create(data);
        return await this.repository.save(attendance);
    }

    async findAll(): Promise<Attendance[]> {
        return await this.repository.find({
            relations: { employee: true },
            order: { date: "DESC" }
        });
    }

    async findById(id: string): Promise<Attendance | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { employee: true }
        });
    }

    async findByEmployee(employeeId: string): Promise<Attendance[]> {
        return await this.repository.find({
            where: { employeeId },
            relations: { employee: true },
            order: {
                date: "DESC",
                checkIn: "DESC"
            }
        });
    }

    async findByEmployeeAndDate(
        employeeId: string,
        date: string
    ): Promise<Attendance | null> {
        return await this.repository.findOne({
            where: { employeeId, date },
            relations: { employee: true }
        });
    }

    async findByDate(date: string): Promise<Attendance[]> {
        return await this.repository.find({
            where: { date },
            relations: { employee: true }
        });
    }

    async findByStatus(status: string): Promise<Attendance[]> {
        return await this.repository.find({
            where: {
                status: status as AttendanceStatus
            },
            relations: { employee: true }
        });
    }

    async update(
        id: string,
        data: Partial<Attendance>
    ): Promise<Attendance> {
        await this.repository.update(id, data);

        const attendance =
            await this.findById(id);

        if (!attendance) {
            throw new Error(
                "Attendance not found"
            );
        }

        return attendance;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}