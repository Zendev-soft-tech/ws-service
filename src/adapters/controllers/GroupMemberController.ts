import type { Request, Response } from "express";
import { Router } from "express";
import { GroupChatRepository } from "@/src/adapters/repositories/GroupChatRepository.js";
import { GroupMemberRepository } from "@/src/adapters/repositories/GroupMemberRepository.js";
import { AddGroupMember } from "@/src/application/usecases/chat/group/AddGroupMember.js";
import { GetGroupMembers } from "@/src/application/usecases/chat/group/GetGroupMembers.js";
import { UpdateGroupMemberRole } from "@/src/application/usecases/chat/group/UpdateGroupMemberRole.js";
import { RemoveGroupMember } from "@/src/application/usecases/chat/group/RemoveGroupMember.js";
import { AppError } from "@/src/shared/error.js";
export class GroupMemberController {
    public router: Router = Router();
    private groupChatRepository: GroupChatRepository;
    private groupMemberRepository: GroupMemberRepository;
    constructor() {
        this.groupChatRepository = new GroupChatRepository();
        this.groupMemberRepository = new GroupMemberRepository();
        this.router.post("/:groupId/members", this.addHandler.bind(this));
        this.router.get("/:groupId/members/user/:userId",this.getAllHandler.bind(this));
        this.router.put("/:groupId/members/:memberId",this.updateRoleHandler.bind(this));
        this.router.delete("/:groupId/members/:memberId",this.removeHandler.bind(this));
    }
    async addHandler(req: Request, res: Response): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const { userId, memberUserId } = req.body;
            if (!groupId || !userId || !memberUserId) {
                throw new AppError("Group ID, user ID and member user ID are required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const admin = await this.groupMemberRepository.findMember(groupId,userId);
            if (!admin) {
                throw new AppError("User is not a member of this group",403);
            }
            if (admin.role !== "admin") {
                throw new AppError("Only group admin can add members",403);
            }
            const existingMember = await this.groupMemberRepository.findMember(groupId,memberUserId );
            if (existingMember) {
                throw new AppError("User is already a member of this group",409 );
            }
            const usecase = new AddGroupMember(this.groupMemberRepository);
            const member = await usecase.execute(groupId,memberUserId);
            res.status(201).json({
                success: true,
                data: member
            });
        } catch (error: unknown) {
            console.error("ADD GROUP MEMBER ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message  });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"});
        }
    }
    async getAllHandler(req: Request, res: Response): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            if (!groupId || !userId) {
                throw new AppError("Group ID and user ID are required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const member = await this.groupMemberRepository.findMember(groupId,userId);
            if (!member) {
                throw new AppError("User is not a member of this group",403 );
            }
            const usecase = new GetGroupMembers(this.groupMemberRepository);
            const members = await usecase.execute(groupId);
            res.status(200).json({
                success: true,
                data: members
            });
        } catch (error: unknown) {
            console.error("GET GROUP MEMBERS ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    async updateRoleHandler(
        req: Request,
        res: Response  ): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const memberId = Array.isArray(req.params.memberId) ? req.params.memberId[0] : req.params.memberId;
            const { userId, role } = req.body;
            if (!groupId || !memberId || !userId || !role) {
                throw new AppError("Group ID, member ID, user ID and role are required",400 );
            }
            if (!role.trim()) {
                throw new AppError("Role is required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const admin = await this.groupMemberRepository.findMember(groupId,userId);
            if (!admin) {
                throw new AppError("User is not a member of this group",403);
            }
            if (admin.role !== "admin") {
                throw new AppError("Only group admin can update member roles",403);
            }
            const member = await this.groupMemberRepository.findById(memberId);
            if (!member || member.groupId !== groupId) {
                throw new AppError("Group member not found",404);
            }
            if (member.userId === userId && role !== "admin") {
                throw new AppError("Admin cannot remove their own admin role",400 );
            }
            const usecase = new UpdateGroupMemberRole(this.groupMemberRepository);
            const updatedMember = await usecase.execute(memberId,role.trim());
            res.status(200).json({
                success: true,
                data: updatedMember});
        } catch (error: unknown) {
            console.error("UPDATE GROUP MEMBER ROLE ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    async removeHandler(
        req: Request,
        res: Response): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const memberId = Array.isArray(req.params.memberId) ? req.params.memberId[0] : req.params.memberId;
            const { userId } = req.body;
            if (!groupId || !memberId || !userId) {
                throw new AppError("Group ID, member ID and user ID are required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const admin = await this.groupMemberRepository.findMember(groupId,userId);
            if (!admin) {
                throw new AppError("User is not a member of this group",403);
            }
            if (admin.role !== "admin") {
                throw new AppError("Only group admin can remove members",403);
            }
            const member = await this.groupMemberRepository.findById(memberId);
            if (!member || member.groupId !== groupId) {
                throw new AppError("Group member not found",404);
            }
            if (member.userId === group.createdBy) {
                throw new AppError("Group creator cannot be removed",400);
            }
            const usecase = new RemoveGroupMember(this.groupMemberRepository);
            await usecase.execute(memberId);
            res.status(200).json({
                success: true,
                message: "Group member removed successfully"});
        } catch (error: unknown) {
            console.error("REMOVE GROUP MEMBER ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}