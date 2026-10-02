import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Employee } from "@/src/adapters/models/Employee.js";
import { PermissionStatus } from "@/src/application/domain/enum.js";

@Entity("permissions")
export class Permission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid" })
    employeeId!: string;

    @ManyToOne(
        () => Employee,
        employee => employee.permissions,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: "employeeId" })
    employee!: Employee;

    @Column({ type: "date" })
    date!: string;

    @Column({ type: "time" })
    fromTime!: string;

    @Column({ type: "time" })
    toTime!: string;

    @Column({ type: "text" })
    reason!: string;

    @Column({
        type: "enum",
        enum: PermissionStatus,
        default: PermissionStatus.PENDING
    })
    status!: PermissionStatus;

    @Column({
        type: "text",
        nullable: true
    })
    rejectionReason!: string | null;
}