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
        this.router.post("/:groupId/members", this.addHandler.bind(this) );
        this.router.get( "/:groupId/members/user/:userId", this.getAllHandler.bind(this) );
        this.router.put( "/:groupId/members/:memberId", this.updateRoleHandler.bind(this) );
        this.router.delete( "/:groupId/members/:memberId", this.removeHandler.bind(this) );
    }
    async addHandler(req: Request, res: Response) {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const { userId, memberUserId } = req.body;
            if (!groupId || !userId || !memberUserId) {
                throw new AppError( "Group ID, user ID and member user ID are required", 400 );
            }
            const usecase = new AddGroupMember( this.groupChatRepository, this.groupMemberRepository );
            const member = await usecase.execute(
                groupId,
                userId,
                memberUserId
            );
            res.status(201).json({
                success: true,
                data: member
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllHandler(req: Request, res: Response) {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            if (!groupId || !userId) {
                throw new AppError( "Group ID and user ID are required", 400 );
            }
            const usecase = new GetGroupMembers( this.groupChatRepository, this.groupMemberRepository );
            const members = await usecase.execute( groupId, userId );
            res.status(200).json({
                success: true,
                data: members
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async updateRoleHandler(req: Request, res: Response) {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const memberId = Array.isArray(req.params.memberId) ? req.params.memberId[0] : req.params.memberId;
            const { userId, role } = req.body;
            if (!groupId || !memberId || !userId || !role) {
                throw new AppError( "Group ID, member ID, user ID and role are required", 400 );
            }
            const usecase = new UpdateGroupMemberRole(this.groupChatRepository,this.groupMemberRepository);
            const member = await usecase.execute( groupId, userId, memberId, role);
            res.status(200).json({
                success: true,
                data: member
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async removeHandler(req: Request, res: Response) {
        try {
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const memberId = Array.isArray(req.params.memberId) ? req.params.memberId[0] : req.params.memberId;
            const userId = req.body.userId;
            if (!groupId || !memberId || !userId) {
                throw new AppError( "Group ID, member ID and user ID are required", 400 );
            }
            const usecase = new RemoveGroupMember( this.groupChatRepository, this.groupMemberRepository );
            await usecase.execute( groupId, userId, memberId);
            res.status(200).json({
                success: true,
                message: "Group member removed successfully"
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
