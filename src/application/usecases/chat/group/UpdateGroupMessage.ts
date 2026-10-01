import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js"
import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js"
import { AppError } from "@/src/shared/error.js"

export class UpdateGroupMessage {

  constructor(
    private readonly groupChatRepository: IGroupChatRepository,
    private readonly groupMemberRepository: IGroupMemberRepository,
    private readonly groupMessageRepository: IGroupMessageRepository
  ) {}

  async execute(
    messageId: string,
    userId: string,
    message: string
  ) {

    if (!messageId) {
      throw new AppError(
        "Message ID is required",
        400
      )
    }

    if (!userId) {
      throw new AppError(
        "User ID is required",
        400
      )
    }

    if (!message || !message.trim()) {
      throw new AppError(
        "Message is required",
        400
      )
    }

    const existingMessage =
      await this.groupMessageRepository.findById(messageId)

    if (!existingMessage) {
      throw new AppError(
        "Group message not found",
        404
      )
    }

    const group =
      await this.groupChatRepository.findById(
        existingMessage.groupId
      )

    if (!group) {
      throw new AppError(
        "Group not found",
        404
      )
    }

    const member =
      await this.groupMemberRepository.findMember(
        existingMessage.groupId,
        userId
      )

    if (!member) {
      throw new AppError(
        "User is not a member of this group",
        403
      )
    }

    if (existingMessage.senderId !== userId) {
      throw new AppError(
        "You can only update your own message",
        403
      )
    }

    return await this.groupMessageRepository.update(
      messageId,
      message.trim()
    )
  }
}