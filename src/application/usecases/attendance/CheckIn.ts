import { AttendanceStatus } from "@/src/application/domain/enum.js";
import type { IAttendanceRepository } from "@/src/application/interfaces/IAttendanceRepository.js";

export class CheckIn {
    constructor(private repository: IAttendanceRepository) {}

    async execute(employeeId: string) {
        const now = new Date();

        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

        const existing = await this.repository.findByEmployeeAndDate(employeeId, date);

        if (existing?.checkIn) {
            throw new Error("Already checked in");
        }

        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const startMinutes = 9 * 60;
        const halfDayMinutes = 12 * 60;
        

        let lateMinutes = 0;
        let status = AttendanceStatus.PRESENT;

        if (currentMinutes >= halfDayMinutes) {
            status = AttendanceStatus.HALF_DAY;
        } else if (currentMinutes > 9 * 60 + 15) {
            lateMinutes = currentMinutes - startMinutes;
            status = AttendanceStatus.LATE;
        }

        return await this.repository.create({
            employee: { id: employeeId } as any,
            date,
            checkIn: now,
            checkOut: null,
            status,
            lateMinutes,
            workHours: 0
        });
    }
}