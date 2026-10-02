import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import { AppError } from "@/src/shared/error.js"

export class AddGroupMember {

  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository
  ) {}

  async execute(
    groupId: string,
    userId: string,
    memberUserId: string
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

    if (!memberUserId) {
      throw new AppError(
        "Member user ID is required",
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

    const admin =
      await this.groupMemberRepository.findMember(
        groupId,
        userId
      )

    if (!admin) {
      throw new AppError(
        "User is not a member of this group",
        403
      )
    }

    if (admin.role !== "admin") {
      throw new AppError(
        "Only group admin can add members",
        403
      )
    }

    const existingMember =
      await this.groupMemberRepository.findMember(
        groupId,
        memberUserId
      )

    if (existingMember) {
      throw new AppError(
        "User is already a member of this group",
        409
      )
    }

    return await this.groupMemberRepository.addMember(
      groupId,
      memberUserId
    )
  }
}