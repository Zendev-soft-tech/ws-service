import { AppDataSource } from "@/src/infrastructure/database.js"
import { DirectChat } from "@/src/adapters/models/DirectChat.js"
import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
export class DirectChatRepository implements IDirectChatRepository {
  private repository = AppDataSource.getRepository(DirectChat)
  async create(
    userOneId: string,
    userTwoId: string): Promise<DirectChat> {
    const chat = this.repository.create({userOneId,userTwoId})
    return await this.repository.save(chat)
  }
  async findById(id: string ): Promise<DirectChat | null> {
    return await this.repository.findOne({
      where: { id }
    })
  }
  async findByUsers(
    userOneId: string,
    userTwoId: string): Promise<DirectChat | null> {
    return await this.repository.findOne({
      where: [
        {
          userOneId,
          userTwoId
        },
        {
          userOneId: userTwoId,
          userTwoId: userOneId
        }
      ]
    })
  }
  async findByUserId( userId: string): Promise<DirectChat[]> {
    return await this.repository.find({
      where: [
        { userOneId: userId },
        { userTwoId: userId }
      ],
      order: {
        updatedAt: "DESC"
      }
    })
  }
}