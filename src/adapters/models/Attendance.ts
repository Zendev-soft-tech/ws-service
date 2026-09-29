import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "@/src/adapters/models/Employee.js";
import { AttendanceStatus } from "@/src/application/domain/enum.js";

@Entity("attendance")
export class Attendance {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid" })
    employeeId!: string;

    @ManyToOne(
        () => Employee,
        employee => employee.attendances,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "employeeId" })
    employee!: Employee;

    @Column({ type: "date" })
    date!: string;

    @Column({ type: "timestamp", nullable: true })
    checkIn!: Date | null;

    @Column({ type: "timestamp", nullable: true })
    checkOut!: Date | null;

    @Column({ type: "enum", enum: AttendanceStatus })
    status!: AttendanceStatus;

    @Column({ type: "int", default: 0 })
    lateMinutes!: number;

    @Column({ type: "float", default: 0 })
    workHours!: number;
}