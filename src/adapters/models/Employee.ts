import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import { Department } from "@/src/adapters/models/Department.js";
import { Designation } from "@/src/adapters/models/Designation.js";
import { Location } from "@/src/adapters/models/Location.js";
import { Attendance } from "@/src/adapters/models/Attendance.js";
import { Leave } from "@/src/adapters/models/Leave.js";
import { Permission } from "@/src/adapters/models/Permission.js";
import { Organization } from "@/src/adapters/models/Organization.js";

import {
    Gender, MaritalStatus, BloodGroup, UserRole,
    EmployeeType, EmployeeStatus, AllowanceType, DeductionType
} from "@/src/application/domain/enum.js";

export interface SalaryAllowance {
    type: AllowanceType;
    percentage: number;
    amount: number;
}

export interface SalaryDeduction {
    type: DeductionType;
    percentage: number;
    amount: number;
}

export interface EmployeeSalary {
    basicSalary: number;
    allowances: SalaryAllowance[];
    deductions: SalaryDeduction[];
    totalAllowances: number;
    totalDeductions: number;
    totalSalary: number;
}

@Entity("employees")
export class Employee {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @Column({ type: "boolean", default: false })
    mustChangePassword!: boolean;

    @Column({ type: "enum", enum: UserRole, default: UserRole.EMPLOYEE })
    role!: UserRole;

    @Column({ type: "varchar", nullable: true })
    registrationOtp!: string | null;

    @Column({ type: "timestamp", nullable: true })
    registrationOtpExpiry!: Date | null;

    @Column({ type: "boolean", default: false })
    emailVerified!: boolean;

    @Column({ type: "varchar", nullable: true })
    resetPasswordToken!: string | null;

    @Column({ type: "timestamp", nullable: true })
    resetPasswordExpiry!: Date | null;

    @Column({ type: "varchar", unique: true, nullable: true })
    employeeNumber!: string | null;

    @Column({ type: "varchar" })
    fullName!: string;

    @Column({ type: "varchar", nullable: true })
    mobileNumber!: string | null;

    @Column({ type: "date", nullable: true })
    dob!: Date | null;

    @Column({ type: "enum", enum: Gender, nullable: true })
    gender!: Gender | null;

    @Column({ type: "enum", enum: MaritalStatus, nullable: true })
    maritalStatus!: MaritalStatus | null;

    @Column({ type: "enum", enum: BloodGroup, nullable: true })
    bloodGroup!: BloodGroup | null;

    @Column({ type: "varchar", nullable: true })
    aadhaarNumber!: string | null;

    @Column({ type: "varchar", nullable: true })
    panNumber!: string | null;

    @Column({ type: "varchar", nullable: true })
    joiningLetterUrl!: string | null;

    @Column({ type: "varchar", nullable: true })
    degreeCertificateUrl!: string | null;

    @ManyToOne(() => Department, department => department.employees, { nullable: true })
    department!: Department | null;

    @ManyToOne(() => Designation, designation => designation.employees, {
        nullable: true,
        onDelete: "SET NULL"
    })
    designation!: Designation | null;

    @ManyToOne(() => Location, location => location.employees, {
        nullable: true,
        onDelete: "SET NULL"
    })
    location!: Location | null;

    @ManyToOne(() => Employee, employee => employee.reportingEmployees, {
        nullable: true, 
        onDelete: "SET NULL"
    })
    reportingTo!: Employee | null;

    @OneToMany(() => Employee, employee => employee.reportingTo)
    reportingEmployees!: Employee[];

    @Column({ type: "enum", enum: EmployeeType, default: EmployeeType.FULL_TIME })
    employeeType!: EmployeeType;

    @Column({ type: "enum", enum: EmployeeStatus, default: EmployeeStatus.ACTIVE })
    employeeStatus!: EmployeeStatus;

    @Column({ type: "date", nullable: true })
    dateOfJoining!: Date | null;

    @OneToMany(() => Attendance, attendance => attendance.employee)
    attendances!: Attendance[];

    @OneToMany(() => Leave, leave => leave.employee)
    leaves!: Leave[];

    @OneToMany(() => Permission, permission => permission.employee)
    permissions!: Permission[];

    @Column({ type: "jsonb", nullable: true })
    salary!: EmployeeSalary | null;

    @ManyToOne(() => Organization, organization => organization.employees, {
        nullable: true
    })
    organization!: Organization | null;
}
