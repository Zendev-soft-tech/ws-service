import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity("direct_messages")
export class DirectMessage {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column("uuid")
  chatId!: string

  @Column("uuid")
  senderId!: string

  @Column("text")
  message!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}