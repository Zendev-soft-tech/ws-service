import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import { AppError } from "@/src/shared/error.js"
export class CreateGroup {
  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository
  ) {}
  async execute(
    name: string,
    createdBy: string
  ) {
    if (!name || !name.trim()) {
      throw new AppError("Group name is required",400)
    }
    if (!createdBy) {
      throw new AppError("Creator ID is required",400)
    }
    const group = await this.groupChatRepository.create( name.trim(),createdBy )
    await this.groupMemberRepository.addMember(
      group.id,
      createdBy,
      "admin"
    )
    return group
  }
}