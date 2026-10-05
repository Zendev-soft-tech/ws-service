import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js";
import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js";
import type { GroupChat } from "@/src/adapters/models/GroupChat.js";
export class CreateGroup {
    constructor(
        private readonly groupChatRepository: IGroupChatRepository,
        private readonly groupMemberRepository: IGroupMemberRepository
    ) {}
    async execute(
        name: string,
        createdBy: string): Promise<GroupChat> {
        const group = await this.groupChatRepository.create(name,createdBy);
        await this.groupMemberRepository.addMember(group.id,createdBy,"admin");
        return group;
    }
}