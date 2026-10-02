import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import { AppError } from "@/src/shared/error.js"
export class GetGroupById {
  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository
  ) {}
  async execute(
    groupId: string,
    userId: string
  ) {
    if (!groupId) {
      throw new AppError("Group ID is required",400)
    }
    if (!userId) {
      throw new AppError("User ID is required",400)
    }
    const group = await this.groupChatRepository.findById(groupId)
    if (!group) {
      throw new AppError("Group not found",404)
    }
    const member = await this.groupMemberRepository.findMember(groupId,userId)
    if (!member) {
      throw new AppError("User is not a member of this group", 403)
    }
    return group
  }
}