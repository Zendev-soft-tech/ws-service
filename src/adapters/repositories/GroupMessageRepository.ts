import { AppDataSource } from "@/src/infrastructure/database.js"
import { GroupMessage } from "@/src/adapters/models/GroupMessage.js"
import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js"
export class GroupMessageRepository
  implements IGroupMessageRepository {
  private repository = AppDataSource.getRepository(GroupMessage)
  async create(
    groupId: string,
    senderId: string,
    message: string ): Promise<GroupMessage> {
    const groupMessage = this.repository.create({
      groupId,
      senderId,
      message
    })
    return await this.repository.save(groupMessage)
  }
  async findById( id: string  ): Promise<GroupMessage | null> {
    return await this.repository.findOne({
      where: { id }
    })
  }
  async findByGroupId( groupId: string  ): Promise<GroupMessage[]> {
    return await this.repository.find({
      where: { groupId },
      order: { createdAt: "ASC" }
    })
  }
  async update(
    id: string,
    message: string ): Promise<GroupMessage | null> {
    const groupMessage = await this.repository.findOne({
      where: { id }
    })
    if (!groupMessage) {
      return null
    }
    groupMessage.message = message
    return await this.repository.save(groupMessage)
  }
  async delete( id: string  ): Promise<void> {
    await this.repository.delete(id)
  }
}