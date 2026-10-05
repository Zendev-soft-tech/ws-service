import type { IGroupMessageRepository } from "@/src/application/interfaces/IGroupMessageRepository.js";
import type { GroupMessage } from "@/src/adapters/models/GroupMessage.js";
export class GetGroupMessages {
    constructor(
        private readonly groupMessageRepository: IGroupMessageRepository
    ) {}
    async execute(groupId: string): Promise<GroupMessage[]> {
        return await this.groupMessageRepository.findByGroupId(groupId);
    }
}