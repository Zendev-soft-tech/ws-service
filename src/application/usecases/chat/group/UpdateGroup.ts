import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js";
import type { GroupChat } from "@/src/adapters/models/GroupChat.js";
export class UpdateGroup {
    constructor(
        private readonly groupChatRepository: IGroupChatRepository
    ) {}
    async execute(
        groupId: string,
        name: string): Promise<GroupChat | null> {
        return await this.groupChatRepository.update(groupId,name);
    }
}