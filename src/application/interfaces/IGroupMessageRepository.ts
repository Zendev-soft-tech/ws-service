import type { GroupMessage } from "@/src/adapters/models/GroupMessage.js"
export interface IGroupMessageRepository {
  create(
    groupId: string,
    senderId: string,
    message: string ): Promise<GroupMessage>
  findById(id: string ): Promise<GroupMessage | null>
  findByGroupId(groupId: string ): Promise<GroupMessage[]>
  update(
    id: string,
    message: string): Promise<GroupMessage | null>
  delete(id: string): Promise<void>
}