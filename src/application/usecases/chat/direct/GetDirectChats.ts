import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js"
import { AppError } from "@/src/shared/error.js"

export class GetDirectChats {

  constructor(
    private readonly directChatRepository: IDirectChatRepository
  ) {}

  async execute(userId: string) {

    if (!userId) {
      throw new AppError(
        "User ID is required",
        400
      )
    }

    return await this.directChatRepository.findByUserId(
      userId
    )
  }
}