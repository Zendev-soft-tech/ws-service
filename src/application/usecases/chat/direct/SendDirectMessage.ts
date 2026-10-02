import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js"
import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
import { AppError } from "@/src/shared/error.js"
export class SendDirectMessage {
  constructor(
    private readonly directMessageRepository: IDirectMessageRepository,
    private readonly directChatRepository: IDirectChatRepository
  ) {}
  async execute(
    chatId: string,
    senderId: string,
    message: string
  ) {
    if (!chatId) {
      throw new AppError("Chat ID is required",400)
    }
    if (!senderId) {
      throw new AppError("Sender ID is required",400)
    }
    if (!message || !message.trim()) {
      throw new AppError("Message is required",400)
    }
    const chat = await this.directChatRepository.findById(chatId)
    if (!chat) {
      throw new AppError("Direct chat not found",404)
    }
    if (
      chat.userOneId !== senderId && chat.userTwoId !== senderId
    ) {
      throw new AppError("User is not a member of this chat",403)
    }
    return await this.directMessageRepository.create(chatId,senderId,message.trim())
  }
}