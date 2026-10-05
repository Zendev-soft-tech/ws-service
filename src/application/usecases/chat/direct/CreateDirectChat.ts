import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js";
import type { DirectChat } from "@/src/adapters/models/DirectChat.js";
export class CreateDirectChat {
    constructor(
        private readonly directChatRepository: IDirectChatRepository
    ) {}
    async execute(
        userOneId: string,
        userTwoId: string): Promise<DirectChat> {
        const existingChat: DirectChat | null = await this.directChatRepository.findByUsers(userOneId,userTwoId);
        if (existingChat) {
            return existingChat;
        }
        return await this.directChatRepository.create(userOneId,userTwoId);
    }
}