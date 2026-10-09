import type { Request, Response } from "express";
import { Router } from "express";
import { GroupChatRepository } from "@/src/adapters/repositories/GroupChatRepository.js";
import { GroupMemberRepository } from "@/src/adapters/repositories/GroupMemberRepository.js";
import { GroupMessageRepository } from "@/src/adapters/repositories/GroupMessageRepository.js";
import { SendGroupMessage } from "@/src/application/usecases/chat/group/SendGroupMessage.js";
import { GetGroupMessages } from "@/src/application/usecases/chat/group/GetGroupMessages.js";
import { UpdateGroupMessage } from "@/src/application/usecases/chat/group/UpdateGroupMessage.js";
import { DeleteGroupMessage } from "@/src/application/usecases/chat/group/DeleteGroupMessage.js";
import { AppError } from "@/src/shared/error.js";
export class GroupMessageController {
    public router: Router = Router();
    private groupChatRepository: GroupChatRepository;
    private groupMemberRepository: GroupMemberRepository;
    private groupMessageRepository: GroupMessageRepository;
    constructor() {
        this.groupChatRepository = new GroupChatRepository();
        this.groupMemberRepository = new GroupMemberRepository();
        this.groupMessageRepository = new GroupMessageRepository();
        this.router.post("/", this.sendHandler.bind(this));
        this.router.get( "/:groupId/user/:userId",this.getAllHandler.bind(this));
        this.router.put("/:id", this.updateHandler.bind(this));
        this.router.delete("/:id", this.deleteHandler.bind(this));
    }
    async sendHandler(req: Request, res: Response): Promise<void> {
        try {
            const { groupId, senderId, message } = req.body;
            if (!groupId || !senderId || !message) {
                throw new AppError("groupId, senderId and message are required",400);
            }
            if (!message.trim()) {
                throw new AppError("Message is required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found",404);
            }
            const member = await this.groupMemberRepository.findMember( groupId,senderId);
            if (!member) {
                throw new AppError("User is not a member of this group",403);
            }
            const usecase = new SendGroupMessage(this.groupMessageRepository);
            const result = await usecase.execute(groupId,senderId,message.trim());
            res.status(201).json({
                success: true,
                data: result});
        } catch (error: unknown) {
            console.error("SEND GROUP MESSAGE ERROR:", error);
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
            const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            if (!groupId || !userId) {
                throw new AppError("Group ID and user ID are required",400);
            }
            const group = await this.groupChatRepository.findById(groupId);
            if (!group) {
                throw new AppError("Group not found",404);
            }
            const member = await this.groupMemberRepository.findMember(groupId,userId);
            if (!member) {
                throw new AppError("User is not a member of this group",403);
            }
            const usecase = new GetGroupMessages(this.groupMessageRepository);
            const result = await usecase.execute(groupId);
            res.status(200).json({
                success: true,
                data: result});
        } catch (error: unknown) {
            console.error("GET GROUP MESSAGES ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message});
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error"});
        }
    }
    async updateHandler(req: Request, res: Response): Promise<void> {
        try {
            const messageId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { userId, message } = req.body;
            if (!messageId || !userId || !message) {
                throw new AppError( "Message ID, user ID and message are required", 400 );
            }
            if (!message.trim()) {
                throw new AppError( "Message is required",400);
            }
            const existingMessage = await this.groupMessageRepository.findById(messageId);
            if (!existingMessage) {
                throw new AppError("Group message not found",404);
            }
            const group = await this.groupChatRepository.findById(existingMessage.groupId);
            if (!group) {
                throw new AppError("Group not found",404);
            }
            const member = await this.groupMemberRepository.findMember(existingMessage.groupId,userId );
            if (!member) {
                throw new AppError("User is not a member of this group", 403 );
            }
            if (existingMessage.senderId !== userId) {
                throw new AppError("You can only update your own message",403);
            }
            const usecase = new UpdateGroupMessage(this.groupMessageRepository);
            const result = await usecase.execute(messageId,message.trim() );
            res.status(200).json({
                success: true,
                data: result });
        } catch (error: unknown) {
            console.error("UPDATE GROUP MESSAGE ERROR:", error);
            if (error instanceof AppError) {
                res.status(error.errorCode).json({
                    success: false,
                    message: error.message });
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
            const messageId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { userId } = req.body;
            if (!messageId || !userId) {
                throw new AppError("Message ID and user ID are required",400);
            }

            const existingMessage = await this.groupMessageRepository.findById(messageId);
            if (!existingMessage) {
                throw new AppError("Group message not found",404);
            }
            if (existingMessage.senderId !== userId) {
                throw new AppError("You can only delete your own message",403);
            }
            const usecase = new DeleteGroupMessage(this.groupMessageRepository);
            await usecase.execute(messageId);
            res.status(200).json({
                success: true,
                message: "Message deleted successfully"});
        } catch (error: unknown) {
            console.error("DELETE GROUP MESSAGE ERROR:", error);
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
}