import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js"
import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
import { AppError } from "@/src/shared/error.js"
export class GetDirectMessages {
  constructor(
    private readonly directMessageRepository: IDirectMessageRepository,
    private readonly directChatRepository: IDirectChatRepository
  ) {}
  async execute(
    chatId: string,
    userId: string
  ) {
    if (!chatId) {
      throw new AppError("Chat ID is required", 400)
    }
    if (!userId) {
      throw new AppError("User ID is required",400)
    }
    const chat = await this.directChatRepository.findById(chatId)
    if (!chat) {
      throw new AppError("Direct chat not found",404)
    }
    if (
      chat.userOneId !== userId && chat.userTwoId !== userId
    ) {
      throw new AppError("User is not a member of this chat",403)
    }
    return await this.directMessageRepository.findByChatId( chatId )
  }
}