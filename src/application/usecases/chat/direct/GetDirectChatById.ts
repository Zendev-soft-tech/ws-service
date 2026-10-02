import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
import { AppError } from "@/src/shared/error.js"
export class GetDirectChatById {
  constructor(
    private readonly directChatRepository: IDirectChatRepository
  ) {}
  async execute(id: string) {
    if (!id) {
      throw new AppError("Chat ID is required",400)
    }
    const chat = await this.directChatRepository.findById(id)
    if (!chat) {
      throw new AppError("Direct chat not found",404)
    }
    return chat
  }
}