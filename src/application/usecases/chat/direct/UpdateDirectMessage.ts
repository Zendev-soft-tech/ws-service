import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js"
import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
import { AppError } from "@/src/shared/error.js"

export class UpdateDirectMessage {

  constructor(
    private readonly directMessageRepository: IDirectMessageRepository,
    private readonly directChatRepository: IDirectChatRepository
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
      await this.directMessageRepository.findById(messageId)

    if (!existingMessage) {
      throw new AppError(
        "Direct message not found",
        404
      )
    }

    const chat =
      await this.directChatRepository.findById(
        existingMessage.chatId
      )

    if (!chat) {
      throw new AppError(
        "Direct chat not found",
        404
      )
    }

    if (
      chat.userOneId !== userId &&
      chat.userTwoId !== userId
    ) {
      throw new AppError(
        "User is not a member of this chat",
        403
      )
    }

    if (existingMessage.senderId !== userId) {
      throw new AppError(
        "You can only update your own message",
        403
      )
    }

    return await this.directMessageRepository.update(
      messageId,
      message.trim()
    )
  }
}