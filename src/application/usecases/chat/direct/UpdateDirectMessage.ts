import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js";
import type { DirectMessage } from "@/src/adapters/models/DirectMessage.js";
export class UpdateDirectMessage {
    constructor(
        private readonly directMessageRepository: IDirectMessageRepository
    ) {}
    async execute(
        messageId: string,
        message: string): Promise<DirectMessage | null> {
        return await this.directMessageRepository.update(messageId,message);
    }
}