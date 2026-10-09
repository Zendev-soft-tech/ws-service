import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany} from "typeorm";
import { Employee } from "@/src/adapters/models/Employee.js";
import { Designation } from "@/src/adapters/models/Designation.js";
import { Organization } from "@/src/adapters/models/Organization.js";

@Entity("departments")
export class Department {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type:"varchar"})
    name!: string;

    @Column({ unique: true,type:"varchar"})
    code!: string;

    @OneToMany(
        () => Employee,
        employee => employee.department
    )
    employees!: Employee[];

    @OneToMany(
        () => Designation,
        designation => designation.department
    )
    designations!: Designation[];

    @ManyToOne(
        () => Organization,
        organization => organization.departments
    )
    organization!: Organization;
}