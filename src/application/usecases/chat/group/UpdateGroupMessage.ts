import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js";
import type { GroupMessage } from "@/src/adapters/models/GroupMessage.js";
export class UpdateGroupMessage {
    constructor(
        private readonly groupMessageRepository: IGroupMessageRepository
    ) {}
    async execute(
        messageId: string,
        message: string): Promise<GroupMessage | null> {
        return await this.groupMessageRepository.update( messageId, message );
    }
}