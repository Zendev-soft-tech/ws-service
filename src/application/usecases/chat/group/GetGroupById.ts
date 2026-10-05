import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js";
import type { GroupChat } from "@/src/adapters/models/GroupChat.js";
export class GetGroupById {
    constructor(
        private readonly groupChatRepository: IGroupChatRepository
    ) {}
    async execute(groupId: string): Promise<GroupChat | null> {
        return await this.groupChatRepository.findById(groupId);
    }
}