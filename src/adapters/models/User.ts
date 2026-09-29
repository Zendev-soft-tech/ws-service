import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Employee } from "@/src/adapters/models/Employee.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true, type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;
}