import {Entity,PrimaryGeneratedColumn,Column, OneToMany,ManyToOne} from "typeorm";
import { Employee } from "@/src/adapters/models/Employee.js";
import { Organization } from "@/src/adapters/models/Organization.js";
@Entity("locations")
export class Location {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type:"varchar"})
    name!: string;

    @Column({ unique: true,type:"varchar"})
    code!: string;

    @Column({type:"varchar"})
    city!: string;

    @Column({type:"varchar"})
    state!: string;

    @Column({type:"varchar"})
    country!: string;

    @Column({type:"varchar"})
    postalCode!: string;

    @OneToMany(
        () => Employee,
        employee => employee.location
    )

    @ManyToOne(() => Organization, organization => organization.locations)
    organization!: Organization;

    employees!: Employee[];
}