import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Employee }
    from "@/src/adapters/models/Employee.js";

import {
    LeaveType,
    LeaveDayType,
    LeaveStatus
} from "@/src/application/domain/enum.js";


@Entity("leaves")
export class Leave {

    @PrimaryGeneratedColumn("uuid")
    id!: string;


    @Column({ type: "uuid" })
    employeeId!: string;


    @ManyToOne(
        () => Employee,
        employee => employee.leaves,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: "employeeId" })
    employee!: Employee;


    @Column({
        type: "enum",
        enum: LeaveType
    })
    leaveType!: LeaveType;


    @Column({
        type: "enum",
        enum: LeaveDayType
    })
    dayType!: LeaveDayType;


    @Column({
        type: "date"
    })
    fromDate!: string;


    @Column({
        type: "date"
    })
    toDate!: string;


    @Column({
        type: "float"
    })
    days!: number;


    @Column({
        type: "text"
    })
    reason!: string;


    @Column({
        type: "enum",
        enum: LeaveStatus,
        default: LeaveStatus.PENDING
    })
    status!: LeaveStatus;


    @Column({
        nullable: true,
        type: "text"
    })
    rejectionReason!: string | null;
}