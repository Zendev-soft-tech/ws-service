import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity("direct_chats")
export class DirectChat {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column("uuid")
  userOneId!: string

  @Column("uuid")
  userTwoId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}