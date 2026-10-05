import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,OneToMany,JoinColumn} from "typeorm";
import { User } from "@/src/adapters/models/User.js";
import { DirectMessage } from "@/src/adapters/models/DirectMessage.js";
@Entity("direct_chats")
export class DirectChat {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column("uuid")
    userOneId!: string;
    @Column("uuid")
    userTwoId!: string;
    @ManyToOne(() => User, (user) => user.directChatsAsUserOne)
    @JoinColumn({ name: "userOneId" })
    userOne!: User;
    @ManyToOne(() => User, (user) => user.directChatsAsUserTwo)
    @JoinColumn({ name: "userTwoId" })
    userTwo!: User;
    @OneToMany(() => DirectMessage, (message) => message.chat)
    messages!: DirectMessage[];
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}