import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js";
import type { GroupMember } from "@/src/adapters/models/GroupMembers.js";
export class UpdateGroupMemberRole {
    constructor(
        private readonly groupMemberRepository: IGroupMemberRepository
    ) {}
    async execute(
        memberId: string,
        role: string): Promise<GroupMember | null> {
        return await this.groupMemberRepository.updateRole( memberId, role);
    }
}