import { AttendanceStatus } from "@/src/application/domain/enum.js";
import type { IAttendanceRepository } from "@/src/application/interfaces/IAttendanceRepository.js";

export class CheckOut {
    constructor(private repository: IAttendanceRepository) {}

    async execute(employeeId: string) {
        const attendances = await this.repository.findByEmployee(employeeId);

        const attendance = attendances.find(
            item => item.checkIn !== null && !item.checkOut
        );

        if (!attendance) {
            throw new Error("Check in first");
        }

        if (!attendance.checkIn) {
            throw new Error("Check in first");
        }

        const now = new Date();

        const milliseconds =
            now.getTime() - attendance.checkIn.getTime();

        const workHours =
            milliseconds / (1000 * 60 * 60);

        return await this.repository.update(attendance.id, {
            checkOut: now,
            workHours: Number(workHours.toFixed(2)),
            status:
                attendance.status === AttendanceStatus.HALF_DAY
                    ? AttendanceStatus.HALF_DAY
                    : AttendanceStatus.PRESENT
        });
    }
}