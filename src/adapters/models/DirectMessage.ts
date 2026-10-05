import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn} from "typeorm";
import { DirectChat } from "@/src/adapters/models/DirectChat.js";
import { User } from "@/src/adapters/models/User.js";
@Entity("direct_messages")
export class DirectMessage {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column("uuid")
    chatId!: string;
    @Column("uuid")
    senderId!: string;
    @Column("uuid")
    receiverId!: string;
    @Column("text")
    message!: string;
    @ManyToOne(() => DirectChat, (chat) => chat.messages)
    @JoinColumn({ name: "chatId" })
    chat!: DirectChat;
    @ManyToOne(() => User)
    @JoinColumn({ name: "senderId" })
    sender!: User;
    @ManyToOne(() => User)
    @JoinColumn({ name: "receiverId" })
    receiver!: User;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}