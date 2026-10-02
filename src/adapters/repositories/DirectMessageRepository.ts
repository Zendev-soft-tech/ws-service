import { AppDataSource } from "@/src/infrastructure/database.js"
import { DirectMessage } from "@/src/adapters/models/DirectMessage.js"
import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js"
export class DirectMessageRepository
  implements IDirectMessageRepository {
  private repository = AppDataSource.getRepository(DirectMessage)
  async create(
    chatId: string,
    senderId: string,
    message: string): Promise<DirectMessage> {
    const directMessage = this.repository.create({chatId,senderId,message})
    return await this.repository.save(directMessage)
  }
  async findById(id: string): Promise<DirectMessage | null> {
    return await this.repository.findOne({
      where: { id }
    })
  }
  async findByChatId(chatId: string): Promise<DirectMessage[]> {
    return await this.repository.find({
      where: { chatId },
      order: {
      createdAt: "ASC"
      }
    })
  }
  async update(
    id: string,
    message: string ): Promise<DirectMessage | null> {
    const directMessage = await this.repository.findOne({
      where: { id }
    })
    if (!directMessage) {
      return null
    }
    directMessage.message = message
    return await this.repository.save(directMessage)
  }
  async delete( id: string): Promise<void> {
    await this.repository.delete(id)
  }
}