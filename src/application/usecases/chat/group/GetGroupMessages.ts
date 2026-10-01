import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js"
import { AppError } from "@/src/shared/error.js"

export class GetGroupMessages {

  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository,
    private readonly groupMessageRepository: IGroupMessageRepository
  ) {}

  async execute(
    groupId: string,
    userId: string
  ) {

    if (!groupId) {
      throw new AppError(
        "Group ID is required",
        400
      )
    }

    if (!userId) {
      throw new AppError(
        "User ID is required",
        400
      )
    }

    const group =
      await this.groupChatRepository.findById(groupId)

    if (!group) {
      throw new AppError(
        "Group not found",
        404
      )
    }

    const member =
      await this.groupMemberRepository.findMember(
        groupId,
        userId
      )

    if (!member) {
      throw new AppError(
        "User is not a member of this group",
        403
      )
    }

    return await this.groupMessageRepository.findByGroupId(
      groupId
    )
  }
}