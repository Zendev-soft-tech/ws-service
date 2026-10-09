import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js";
import type { DirectChat } from "@/src/adapters/models/DirectChat.js";
export class GetDirectChats {
    constructor(
        private readonly directChatRepository: IDirectChatRepository
    ) {}
    async execute(userId: string): Promise<DirectChat[]> {
        return await this.directChatRepository.findByUserId(userId);
    }
}