import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm"

@Entity("group_members")
export class GroupMember {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column("uuid")
  groupId!: string

  @Column("uuid")
  userId!: string

  @Column("varchar", { default: "member" })
  role!: string

  @CreateDateColumn()
  joinedAt!: Date
}