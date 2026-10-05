import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js";
import type { GroupChat } from "@/src/adapters/models/GroupChat.js";
export class GetGroups {
    constructor(
        private readonly groupChatRepository: IGroupChatRepository
    ) {}
    async execute(userId: string ): Promise<GroupChat[]> {
        return await this.groupChatRepository.findByUserId(userId);
    }
}