import { DirectChat } from "@/src/adapters/models/DirectChat.js"

export interface IDirectChatRepository {

  create(
    userOneId: string,
    userTwoId: string
  ): Promise<DirectChat>

  findById(
    id: string
  ): Promise<DirectChat | null>

  findByUsers(
    userOneId: string,
    userTwoId: string
  ): Promise<DirectChat | null>

  findByUserId(
    userId: string
  ): Promise<DirectChat[]>
}