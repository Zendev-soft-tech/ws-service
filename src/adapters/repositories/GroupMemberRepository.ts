import { AppDataSource } from "@/src/infrastructure/database.js"
import { GroupMember } from "@/src/adapters/models/GroupMembers.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
export class GroupMemberRepository
  implements IGroupMemberRepository {
  private repository = AppDataSource.getRepository(GroupMember)
  async addMember(
    groupId: string,
    userId: string,
    role: string = "member" ): Promise<GroupMember> {
    const member = this.repository.create({
      groupId,
      userId,
      role
    })
    return await this.repository.save(member)
  }
  async findById(id: string ): Promise<GroupMember | null> {
    return await this.repository.findOne({
      where: { id }
    })
  }
  async findByGroupId( groupId: string ): Promise<GroupMember[]> {

    return await this.repository.find({
      where: { groupId },
      order: {joinedAt: "ASC"}
    })
  }
  async findByUserId(userId: string ): Promise<GroupMember[]> {
    return await this.repository.find({
      where: { userId },
      order: {joinedAt: "DESC"}
    })
  }
  async findMember(
    groupId: string,
    userId: string ): Promise<GroupMember | null> {
    return await this.repository.findOne({
      where: {
        groupId,
        userId
      }
    })
  }
  async updateRole(
    id: string,
    role: string ): Promise<GroupMember | null> {
    const member = await this.repository.findOne({
      where: { id }
    })
    if (!member) {
      return null
    }
    member.role = role
    return await this.repository.save(member)
  }
  async removeMember(id: string  ): Promise<void> {
    await this.repository.delete(id)
  }
}