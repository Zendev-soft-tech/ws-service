import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js"
import { AppError } from "@/src/shared/error.js"
export class GetGroups {
  constructor(
    private readonly groupChatRepository: IGroupChatRepository
  ) {}
  async execute(userId: string) {
    if (!userId) {
      throw new AppError("User ID is required",400)
    }
    return await this.groupChatRepository.findByUserId(userId)
  }
}