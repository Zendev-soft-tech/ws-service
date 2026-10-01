import type { GroupMember } from "@/src/adapters/models/GroupMembers.js"

export interface IGroupMemberRepository {

  addMember(
    groupId: string,
    userId: string,
    role?: string
  ): Promise<GroupMember>

  findById(
    id: string
  ): Promise<GroupMember | null>

  findByGroupId(
    groupId: string
  ): Promise<GroupMember[]>

  findByUserId(
    userId: string
  ): Promise<GroupMember[]>

  findMember(
    groupId: string,
    userId: string
  ): Promise<GroupMember | null>

  updateRole(
    id: string,
    role: string
  ): Promise<GroupMember | null>

  removeMember(
    id: string
  ): Promise<void>
}