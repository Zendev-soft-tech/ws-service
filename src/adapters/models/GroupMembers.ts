import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn} from "typeorm";
import { GroupChat } from "@/src/adapters/models/GroupChat.js";
import { User } from "@/src/adapters/models/User.js";
@Entity("group_members")
export class GroupMember {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column("uuid")
    groupId!: string;
    @Column("uuid")
    userId!: string;
    @Column("varchar", { default: "member" })
    role!: string;
    @ManyToOne(() => GroupChat, (group) => group.members)
    @JoinColumn({ name: "groupId" })
    group!: GroupChat;
    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;
    @CreateDateColumn()
    joinedAt!: Date;
}