import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js";
import type { GroupMessage } from "@/src/adapters/models/GroupMessage.js";
export class SendGroupMessage {
    constructor(
        private readonly groupMessageRepository: IGroupMessageRepository
    ) {}
    async execute(
        groupId: string,
        senderId: string,
        message: string): Promise<GroupMessage> {
        return await this.groupMessageRepository.create(groupId,senderId,message);
    }
}