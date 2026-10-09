import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js";
import type { DirectMessage } from "@/src/adapters/models/DirectMessage.js";
export class GetDirectMessages {
    constructor(
        private readonly directMessageRepository: IDirectMessageRepository
    ) {}
    async execute(chatId: string): Promise<DirectMessage[]> {
        return await this.directMessageRepository.findByChatId(chatId);
    }
}