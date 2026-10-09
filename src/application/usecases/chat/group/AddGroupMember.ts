import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js";
import type { GroupMember } from "@/src/adapters/models/GroupMembers.js";
export class AddGroupMember {
    constructor(
        private readonly groupMemberRepository: IGroupMemberRepository
    ) {}
    async execute(
        groupId: string,
        memberUserId: string): Promise<GroupMember> {
        return await this.groupMemberRepository.addMember(groupId,memberUserId);
    }
}