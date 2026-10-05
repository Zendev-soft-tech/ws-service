import type { IGroupMemberRepository } from "@/src/application/interfaces/IGroupMembersRepository.js";
export class RemoveGroupMember {
    constructor(
        private readonly groupMemberRepository: IGroupMemberRepository
    ) {}
    async execute(memberId: string): Promise<void> {
        await this.groupMemberRepository.removeMember(memberId);
    }
}