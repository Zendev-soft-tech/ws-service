import type { Request, Response } from "express";
import { Router } from "express";
import { GroupChatRepository } from "@/src/adapters/repositories/GroupChatRepository.js";
import { GroupMemberRepository } from "@/src/adapters/repositories/GroupMemberRepository.js";
import { CreateGroup } from "@/src/application/usecases/chat/group/CreateGroup.js";
import { GetGroups } from "@/src/application/usecases/chat/group/GetGroups.js";
import { GetGroupById } from "@/src/application/usecases/chat/group/GetGroupById.js";
import { UpdateGroup } from "@/src/application/usecases/chat/group/UpdateGroup.js";
import { DeleteGroup } from "@/src/application/usecases/chat/group/DeleteGroup.js";
import { AppError } from "@/src/shared/error.js";
export class GroupChatController {
    public router: Router = Router();
    private groupChatRepository: GroupChatRepository;
    private groupMemberRepository: GroupMemberRepository;
    constructor() {
        this.groupChatRepository = new GroupChatRepository();
        this.groupMemberRepository = new GroupMemberRepository();
        this.router.post("/", this.createHandler.bind(this));
        this.router.get("/user/:userId", this.getAllHandler.bind(this));
        this.router.get("/:id/user/:userId", this.getByIdHandler.bind(this));
        this.router.put("/:id", this.updateHandler.bind(this));
        this.router.delete("/:id", this.deleteHandler.bind(this));
    }
    async createHandler(req: Request, res: Response): Promise<void> {
        try {
            const { name, createdBy } = req.body;
            if (!name || !createdBy) {
                throw new AppError("name and createdBy are required", 400);
            }
            if (!name.trim()) {
                throw new AppError("Group name is required", 400);
            }
            const usecase = new CreateGroup(
                this.groupChatRepository,
                this.groupMemberRepository);
            const group = await usecase.execute(name.trim(),createdBy);
            res.status(201).json({
                success: true,
                data: group});
        } catch (error: unknown) {
            console.error("GROUP CREATE ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message});
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    async getAllHandler(req: Request, res: Response): Promise<void> {
        try {
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            if (!userId) {
                throw new AppError("User ID is required", 400);
            }
            const usecase = new GetGroups(this.groupChatRepository);
            const groups = await usecase.execute(userId);
            res.status(200).json({
                success: true,
                data: groups});
        } catch (error: unknown) {
            console.error("GROUP GET ALL ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message});
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    async getByIdHandler(req: Request, res: Response): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            if (!groupId || !userId) {
                throw new AppError("Group ID and User ID are required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const member = await this.groupMemberRepository.findMember(groupId,userId);
            if (!member) {
                throw new AppError("User is not a member of this group",403);
            }
            const usecase = new GetGroupById(this.groupChatRepository);
            const result = await usecase.execute(groupId);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: unknown) {
            console.error("GROUP GET BY ID ERROR:", error);
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
    async updateHandler(req: Request, res: Response): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { userId, name } = req.body;
            if (!groupId || !userId || !name) {
                throw new AppError("Group ID, User ID and name are required",400);
            }
            if (!name.trim()) {
                throw new AppError("Group name is required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const member = await this.groupMemberRepository.findMember(groupId, userId);
            if (!member) {
                throw new AppError("User is not a member of this group",403);
            }
            if (member.role !== "admin") {
                throw new AppError("Only group admin can update the group",403);
            }
            const usecase = new UpdateGroup(
                this.groupChatRepository
            );
            const result = await usecase.execute(groupId,name.trim());
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: unknown) {
            console.error("GROUP UPDATE ERROR:", error);
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
    async deleteHandler(req: Request, res: Response): Promise<void> {
        try {
            const groupId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { userId } = req.body;
            if (!groupId || !userId) {
                throw new AppError("Group ID and User ID are required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found", 404);
            }
            const member = await this.groupMemberRepository.findMember(groupId,userId);
            if (!member) {
                throw new AppError("User is not a member of this group",403);
            }
            if (member.role !== "admin") {
                throw new AppError("Only group admin can delete the group",403);
            }
            const usecase = new DeleteGroup(this.groupChatRepository);
            await usecase.execute(groupId);
            res.status(200).json({
                success: true,
                message: "Group deleted successfully"
            });
        } catch (error: unknown) {
            console.error("GROUP DELETE ERROR:", error);
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