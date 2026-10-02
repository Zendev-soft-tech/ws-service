import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
import { AppError } from "@/src/shared/error.js"
export class CreateDirectChat {
  constructor(private readonly directChatRepository: IDirectChatRepository) {}
  async execute(
    userOneId: string,
    userTwoId: string ) {
    if (!userOneId || !userTwoId) {
      throw new AppError("Both user IDs are required", 400)
    }
    if (userOneId === userTwoId) {
      throw new AppError("Users cannot create a chat with themselves",400)
    }
    const existingChat = await this.directChatRepository.findByUsers(userOneId,userTwoId)
    if (existingChat) {
        return existingChat
    }
    return await this.directChatRepository.create(userOneId,userTwoId)
  }
}