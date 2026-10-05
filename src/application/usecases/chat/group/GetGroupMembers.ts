import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js";
import type { GroupMember } from "@/src/adapters/models/GroupMembers.js";
export class GetGroupMembers {
    constructor(
        private readonly groupMemberRepository: IGroupMemberRepository
    ) {}
    async execute(groupId: string): Promise<GroupMember[]> {
        return await this.groupMemberRepository.findByGroupId(groupId);
    }
}