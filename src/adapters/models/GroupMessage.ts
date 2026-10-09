import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn} from "typeorm";
import { GroupChat } from "@/src/adapters/models/GroupChat.js";
import { User } from "@/src/adapters/models/User.js";
@Entity("group_messages")
export class GroupMessage {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column("uuid")
    groupId!: string;
    @Column("uuid")
    senderId!: string;
    @Column("text")
    message!: string;
    @ManyToOne(() => GroupChat, (group) => group.messages)
    @JoinColumn({ name: "groupId" })
    group!: GroupChat;
    @ManyToOne(() => User)
    @JoinColumn({ name: "senderId" })
    sender!: User;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}