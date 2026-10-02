import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js"
import { AppError } from "@/src/shared/error.js"
export class DeleteDirectMessage {
  constructor(
        private readonly directMessageRepository: IDirectMessageRepository
  ) {}
  async execute(
    messageId: string,
    userId: string): Promise<void> {
    if (!messageId) {
      throw new AppError( "Message ID is required", 400)
    }
    if (!userId) {
      throw new AppError("User ID is required",400)
    }
    const message = await this.directMessageRepository.findById(messageId)
    if (!message) {
      throw new AppError("Direct message not found",404)
    }
    if (message.senderId !== userId) {
      throw new AppError("You can only delete your own message", 403)
    }
    await this.directMessageRepository.delete(messageId)
  }
}