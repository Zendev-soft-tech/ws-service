import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js";
export class DeleteGroupMessage {
    constructor(
        private readonly groupMessageRepository: IGroupMessageRepository
    ) {}
    async execute(messageId: string): Promise<void> {
        await this.groupMessageRepository.delete(messageId);
    }
}