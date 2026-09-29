import {Entity,PrimaryGeneratedColumn,Column, OneToMany} from "typeorm";
import { Employee } from "@/src/adapters/models/Employee.js";

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
    employees!: Employee[];
}