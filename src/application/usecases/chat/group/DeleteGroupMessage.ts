import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js"
import { AppError } from "@/src/shared/error.js"
export class DeleteGroupMessage {
  constructor(
    private readonly groupMessageRepository: IGroupMessageRepository
  ) {}
  async execute(
    messageId: string,
    userId: string): Promise<void> {
    if (!messageId) {
      throw new AppError("Message ID is required",400)
    }
    if (!userId) {
      throw new AppError("User ID is required",400)
    }
    const message = await this.groupMessageRepository.findById(messageId)
    if (!message) {
      throw new AppError("Group message not found",404 )
    }
    if (message.senderId !== userId) {
      throw new AppError("You can only delete your own message",403)
    }
    await this.groupMessageRepository.delete(messageId)
  }
}