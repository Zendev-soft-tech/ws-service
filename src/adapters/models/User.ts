import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DirectChat } from "@/src/adapters/models/DirectChat.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true, type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @OneToMany(() => DirectChat, (directChat) => directChat.userOne)
    directChatsAsUserOne!: DirectChat[];

    @OneToMany(() => DirectChat, (directChat) => directChat.userTwo)
    directChatsAsUserTwo!: DirectChat[];
}
