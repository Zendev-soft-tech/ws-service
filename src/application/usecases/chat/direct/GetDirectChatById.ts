import type { IDirectChatRepository } from "@/src/application/interfaces/IDirectChatRepository.js";
import type { DirectChat } from "@/src/adapters/models/DirectChat.js";
export class GetDirectChatById {
    constructor(
        private readonly directChatRepository: IDirectChatRepository
    ) {}
    async execute(id: string): Promise<DirectChat | null> {
        return await this.directChatRepository.findById(id);
    }
}