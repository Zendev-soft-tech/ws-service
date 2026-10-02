import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import { AppError } from "@/src/shared/error.js"

export class RemoveGroupMember {

  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository
  ) {}

  async execute(
    groupId: string,
    userId: string,
    memberId: string
  ): Promise<void> {

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

    if (!memberId) {
      throw new AppError(
        "Member ID is required",
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
        "Only group admin can remove members",
        403
      )
    }

    const member =
      await this.groupMemberRepository.findById(memberId)

    if (!member || member.groupId !== groupId) {
      throw new AppError(
        "Group member not found",
        404
      )
    }

    if (member.userId === group.createdBy) {
      throw new AppError(
        "Group creator cannot be removed",
        400
      )
    }

    await this.groupMemberRepository.removeMember(memberId)
  }
}