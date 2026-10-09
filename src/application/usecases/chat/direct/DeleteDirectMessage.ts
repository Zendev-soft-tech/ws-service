import type { IDirectMessageRepository } from "@/src/application/interfaces/IDirectMessageRepository.js";
export class DeleteDirectMessage {
    constructor(
        private readonly directMessageRepository: IDirectMessageRepository
    ) {}
    async execute(messageId: string): Promise<void> {
        await this.directMessageRepository.delete(messageId);
    }
}