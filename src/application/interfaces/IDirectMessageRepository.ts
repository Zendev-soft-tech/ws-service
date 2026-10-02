import type { DirectMessage } from "@/src/adapters/models/DirectMessage.js"

export interface IDirectMessageRepository {

  create(
    chatId: string,
    senderId: string,
    message: string
  ): Promise<DirectMessage>

  findById(
    id: string
  ): Promise<DirectMessage | null>

  findByChatId(
    chatId: string
  ): Promise<DirectMessage[]>

  update(
    id: string,
    message: string
  ): Promise<DirectMessage | null>

  delete(
    id: string
  ): Promise<void>
}