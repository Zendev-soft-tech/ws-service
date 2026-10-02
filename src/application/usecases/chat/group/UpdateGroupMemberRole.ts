import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import { AppError } from "@/src/shared/error.js"
export class UpdateGroupMemberRole {
  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository
  ) {}
  async execute(
    groupId: string,
    userId: string,
    memberId: string,
    role: string
  ) {
    if (!groupId) {
      throw new AppError("Group ID is required",400)
    }
    if (!userId) {
      throw new AppError("User ID is required",400)
    }
    if (!memberId) {
      throw new AppError("Member ID is required",400)
    }
    if (!role || !role.trim()) {
      throw new AppError("Role is required",400)
    }
    const group = await this.groupChatRepository.findById(groupId)
    if (!group) {
      throw new AppError("Group not found",404)
    }
    const admin = await this.groupMemberRepository.findMember(groupId,userId)
    if (!admin) {
      throw new AppError("User is not a member of this group",403)
    }
    if (admin.role !== "admin") {
      throw new AppError("Only group admin can update member roles",403)
    }
    const member = await this.groupMemberRepository.findById(memberId)
    if (!member || member.groupId !== groupId) {
      throw new AppError("Group member not found",404)
    }
    if (member.userId === userId && role !== "admin") {
      throw new AppError("Admin cannot remove their own admin role",400)
    }
    return await this.groupMemberRepository.updateRole(memberId,role.trim())
  }
}