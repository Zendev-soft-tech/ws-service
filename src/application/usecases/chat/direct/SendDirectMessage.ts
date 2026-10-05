import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js";
import type { DirectMessage } from "@/src/adapters/models/DirectMessage.js";
export class SendDirectMessage {
    constructor(
        private readonly directMessageRepository: IDirectMessageRepository
    ) {}
    async execute(
        chatId: string,
        senderId: string,
        receiverId: string,
        message: string): Promise<DirectMessage> {
        return await this.directMessageRepository.create(chatId,senderId,receiverId,message);
    }
}