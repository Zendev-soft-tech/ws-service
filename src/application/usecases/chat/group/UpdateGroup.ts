import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import { AppError } from "@/src/shared/error.js"

export class UpdateGroup {

  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository
  ) {}

  async execute(
    groupId: string,
    userId: string,
    name: string
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

    if (!name || !name.trim()) {
      throw new AppError(
        "Group name is required",
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

    if (member.role !== "admin") {
      throw new AppError(
        "Only group admin can update the group",
        403
      )
    }

    return await this.groupChatRepository.update(
      groupId,
      name.trim()
    )
  }
}