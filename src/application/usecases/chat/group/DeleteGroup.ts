import type { IGroupChatRepository } from "@/src/application/interfaces/IGroupChatRepository.js";
export class DeleteGroup {
    constructor(
        private readonly groupChatRepository: IGroupChatRepository
    ) {}
    async execute(groupId: string): Promise<void> {
        await this.groupChatRepository.delete(groupId);
    }
}