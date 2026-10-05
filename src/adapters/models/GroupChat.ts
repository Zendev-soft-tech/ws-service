import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany,ManyToOne,JoinColumn} from "typeorm";
import { User } from "@/src/adapters/models/User.js";
import { GroupMember } from "@/src/adapters/models/GroupMembers.js";
import { GroupMessage } from "@/src/adapters/models/GroupMessage.js";
@Entity("group_chats")
export class GroupChat {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column("varchar")
    name!: string;
    @Column("uuid")
    createdBy!: string;
    @ManyToOne(() => User)
    @JoinColumn({ name: "createdBy" })
    creator!: User;
    @OneToMany(() => GroupMember, (member) => member.group)
    members!: GroupMember[];
    @OneToMany(() => GroupMessage, (message) => message.group)
    messages!: GroupMessage[];
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}