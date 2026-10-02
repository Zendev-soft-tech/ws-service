import { AppDataSource } from "@/src/infrastructure/database.js"
import { GroupChat } from "@/src/adapters/models/GroupChat.js"
import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
export class GroupChatRepository
  implements IGroupChatRepository {
  private repository = AppDataSource.getRepository(GroupChat)
  async create(
    name: string,
    createdBy: string): Promise<GroupChat> {
    const group = this.repository.create({name,createdBy })
    return await this.repository.save(group)
  }
  async findById(
    id: string
  ): Promise<GroupChat | null> {
    return await this.repository.findOne({
      where: { id }
    })
  }
  async findByUserId(userId: string): Promise<GroupChat[]> {
    return await this.repository
      .createQueryBuilder("group")
      .innerJoin(
        "group_members",
        "member",
        "member.groupId = group.id"
      )
      .where("member.userId = :userId", { userId })
      .orderBy("group.updatedAt", "DESC")
      .getMany()
  }
  async update(
    id: string,
    name: string
  ): Promise<GroupChat | null> {
    const group = await this.repository.findOne({
      where: { id }
    })
    if (!group) {
      return null
    }
    group.name = name
    return await this.repository.save(group)
  }
  async delete(
    id: string
  ): Promise<void> {
    await this.repository.delete(id)
  }
}