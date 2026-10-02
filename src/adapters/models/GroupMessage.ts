import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity("group_messages")
export class GroupMessage {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column("uuid")
  groupId!: string

  @Column("uuid")
  senderId!: string

  @Column("text")
  message!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}