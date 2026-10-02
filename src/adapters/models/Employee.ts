import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToOne,JoinColumn, OneToMany} from "typeorm";
import { User } from "@/src/adapters/models/User.js";
import { Department } from "@/src/adapters/models/Department.js";
import { Designation } from "@/src/adapters/models/Designation.js";
import { Location } from "@/src/adapters/models/Location.js";
import { Attendance } from "@/src/adapters/models/Attendance.js";
import { Leave } from "@/src/adapters/models/Leave.js";
import { Permission } from "@/src/adapters/models/Permission.js";
import {Gender,MaritalStatus,BloodGroup,UserRole,EmployeeType,EmployeeStatus,AllowanceType,DeductionType} from "@/src/application/domain/enum.js";

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

    @Column({ unique: true,type: "varchar"})
    employeeNumber!: string;

    @Column({type: "varchar"})
    fullName!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({type: "varchar"})
    mobileNumber!: string;


    @Column({type: "date",nullable: true})
    dob!: Date | null;
    
    @Column({type: "enum",enum: Gender,nullable: true})
    gender!: Gender | null;
    
    @Column({type: "enum",enum: MaritalStatus,nullable: true})
    maritalStatus!: MaritalStatus | null;

    @Column({type: "enum",enum: BloodGroup,nullable: true})
    bloodGroup!: BloodGroup | null;

    @Column({type: "varchar"})
    aadhaarNumber!: string;

    @Column({type: "varchar"})
    panNumber!: string;

    @ManyToOne(
        () => Department,
        department => department.employees,
        {
            nullable: true
        }
    )
    department!: Department | null;


    @ManyToOne(
        () => Designation,
        designation => designation.employees,
        {
            nullable: true,
            onDelete: "SET NULL"
        }
    )
    designation!: Designation | null;


    @ManyToOne(
        () => Location,
        location => location.employees,
      {
        nullable: true,
        onDelete: "SET NULL"
      }
    )
    location!: Location | null;


    @ManyToOne(
        () => Employee,
        employee => employee.reportingEmployees,
        {
            nullable: true
        }
    )
    reportingTo!: Employee | null;


    @OneToMany(
        () => Employee,
        employee => employee.reportingTo
    )
    reportingEmployees!: Employee[];


    @Column({type: "enum",enum: UserRole,default: UserRole.EMPLOYEE})
    userRole!: UserRole;

    @Column({type: "enum",enum: EmployeeType,default: EmployeeType.FULL_TIME})
    employeeType!: EmployeeType;

    @Column({type: "enum",enum: EmployeeStatus,default: EmployeeStatus.ACTIVE})
    employeeStatus!: EmployeeStatus;

    @Column({type: "date"})
    dateOfJoining!: Date;

    @OneToMany(
        () => Attendance,
        attendance => attendance.employee
    )
    attendances!: Attendance[];


    @OneToMany(
        () => Leave,
        leave => leave.employee
    )
    leaves!: Leave[];

    @OneToMany(
    () => Permission,
    permission => permission.employee
    )
    permissions!: Permission[];

    @Column({type: "jsonb",nullable: true})
    salary!: EmployeeSalary | null;
}

