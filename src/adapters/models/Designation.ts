import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany} from "typeorm";
import { Department } from "@/src/adapters/models/Department.js";
import { Employee } from "@/src/adapters/models/Employee.js";

@Entity("designations")
export class Designation {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type:"varchar"})
    name!: string;

    @Column({ unique: true,type:"varchar"})
    code!: string;

    @ManyToOne(
        () => Department,
        department => department.designations,
        { nullable: true }
    )
    department!: Department | null;

    @OneToMany(
        () => Employee,
        employee => employee.designation
    )
    employees!: Employee[];
}