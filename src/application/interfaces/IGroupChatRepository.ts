import type { GroupChat } from "@/src/adapters/models/GroupChat.js"
export interface IGroupChatRepository {
  create(
    name: string,
    createdBy: string ): Promise<GroupChat>
  findById(id: string ): Promise<GroupChat | null>
  findByUserId( userId: string ): Promise<GroupChat[]>
  update(
    id: string,
    name: string  ): Promise<GroupChat | null>
  delete( id: string ): Promise<void>
}