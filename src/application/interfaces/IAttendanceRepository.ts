import type { Attendance } from "@/src/adapters/models/Attendance.js";

export interface IAttendanceRepository {
    create(data: Partial<Attendance>): Promise<Attendance>;
    findAll(): Promise<Attendance[]>;
    findById(id: string): Promise<Attendance | null>;
    findByEmployee(employeeId: string): Promise<Attendance[]>;
    findByEmployeeAndDate(employeeId: string, date: string): Promise<Attendance | null>;
    findByDate(date: string): Promise<Attendance[]>;
    findByStatus(status: string): Promise<Attendance[]>;
    update(id: string, data: Partial<Attendance>): Promise<Attendance>;
    delete(id: string): Promise<void>;
}