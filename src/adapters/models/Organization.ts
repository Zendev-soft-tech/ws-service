import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";

import { Location } from "@/src/adapters/models/Location.js";
import { Department } from "@/src/adapters/models/Department.js";
import { Designation } from "@/src/adapters/models/Designation.js";
import { Employee } from "@/src/adapters/models/Employee.js";

@Entity("organizations")
export class Organization {

    @PrimaryGeneratedColumn("uuid")
    orgId!: string;

    @Column({ type: "varchar", unique: true })
    name!: string;

    @Column({ type: "text" })
    address!: string;

    @Column({ type: "varchar" })
    orgType!: string;

    @Column({ type: "varchar", unique: true })
    contactMail!: string;

    @Column({ type: "varchar" })
    contactPerson!: string;

    @Column({ type: "varchar" })
    contactNumber!: string;

    @Column({ type: "varchar", nullable: true })
    logoUrl!: string | null;

    @Column({ type: "varchar", unique: true })
    orgWebsite!: string;

    @OneToMany(() => Location, location => location.organization)
    locations!: Location[];

    @OneToMany(() => Department, department => department.organization)
    departments!: Department[];

    @OneToMany(() => Designation, designation => designation.organization)
    designations!: Designation[];

    @OneToMany(() => Employee, employee => employee.organization)
    employees!: Employee[];

    @Column({ type: "jsonb", nullable: true })
    leaveConfigurations!: any[] | null;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;
}