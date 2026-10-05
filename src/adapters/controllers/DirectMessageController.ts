import type { Request, Response } from "express";
import { Router } from "express";
import { DirectChatRepository } from "@/src/adapters/repositories/DirectChatRepository.js";
import { DirectMessageRepository } from "@/src/adapters/repositories/DirectMessageRepository.js";
import { SendDirectMessage } from "@/src/application/usecases/chat/direct/SendDirectMessage.js";
import { GetDirectMessages } from "@/src/application/usecases/chat/direct/GetDirectMessages.js";
import { UpdateDirectMessage } from "@/src/application/usecases/chat/direct/UpdateDirectMessage.js";
import { DeleteDirectMessage } from "@/src/application/usecases/chat/direct/DeleteDirectMessage.js";
import { AppError } from "@/src/shared/error.js";
export class DirectMessageController {
    public router: Router = Router();
    private directChatRepository: DirectChatRepository;
    private directMessageRepository: DirectMessageRepository;
    constructor() {
        this.directChatRepository = new DirectChatRepository();
        this.directMessageRepository = new DirectMessageRepository();
        this.router.post("/", this.sendHandler.bind(this));
        this.router.get("/:chatId/user/:userId",this.getAllHandler.bind(this) );
        this.router.put("/:id", this.updateHandler.bind(this));
        this.router.delete("/:id", this.deleteHandler.bind(this));
    }
    async sendHandler(
        req: Request,
        res: Response): Promise<void> {
        try {
            const {chatId,senderId,receiverId,message} = req.body;
            if (
                !chatId ||
                !senderId ||
                !receiverId ||
                !message
            ) {
                throw new AppError("chatId, senderId, receiverId and message are required",400);
            }
            if (senderId === receiverId) {
                throw new AppError("Sender and receiver cannot be the same user",400 );
            }
            if (!message.trim()) {
                throw new AppError("Message is required",400);
            }
            const chat = await this.directChatRepository.findById(chatId);
            if (!chat) {
                throw new AppError( "Direct chat not found",404);
            }
            const isSenderMember = chat.userOneId === senderId || chat.userTwoId === senderId;
            const isReceiverMember = chat.userOneId === receiverId || chat.userTwoId === receiverId;
            if (!isSenderMember) {
                throw new AppError( "Sender is not a member of this chat", 403);
            }
            if (!isReceiverMember) {
                throw new AppError("Receiver is not a member of this chat",403);
            }
            const usecase = new SendDirectMessage(this.directMessageRepository);
            const result = await usecase.execute(chatId,senderId,receiverId,message.trim());
            res.status(201).json({
                success: true,
                data: result});
        } catch (error: unknown) {
            console.error("DIRECT MESSAGE SEND ERROR:",error);
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
    async getAllHandler(
        req: Request,
        res: Response): Promise<void> {
        try {
            const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId;
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            if (!chatId || !userId) {
                throw new AppError("chatId and userId are required",400);
            }
            const chat = await this.directChatRepository.findById(chatId);
            if (!chat) {
                throw new AppError("Direct chat not found",404);
            }
            if (chat.userOneId !== userId &&chat.userTwoId !== userId) {
                throw new AppError( "User is not a member of this chat",403);
            }
            const usecase = new GetDirectMessages(this.directMessageRepository);
            const result = await usecase.execute(chatId);
            res.status(200).json({
                success: true,
                data: result});
        } catch (error: unknown) {
            console.error("DIRECT MESSAGE GET ALL ERROR:",error);
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
    async updateHandler(
        req: Request,
        res: Response): Promise<void> {
        try {
            const messageId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const {userId,message} = req.body;
            if (!messageId || !userId || !message) {
                throw new AppError( "messageId, userId and message are required", 400);
            }
            if (!message.trim()) {
                throw new AppError("Message is required",400);
            }
            const existingMessage = await this.directMessageRepository.findById(messageId);
            if (!existingMessage) {
                throw new AppError("Direct message not found",404);
            }
            const chat = await this.directChatRepository.findById(existingMessage.chatId);
            if (!chat) {
                throw new AppError("Direct chat not found",404);
            }
            if (chat.userOneId !== userId && chat.userTwoId !== userId) {
                throw new AppError("User is not a member of this chat",403);
            }
            if (existingMessage.senderId !== userId) {
                throw new AppError("You can only update your own message",403);
            }
            const usecase = new UpdateDirectMessage(this.directMessageRepository);
            const result = await usecase.execute(messageId,message.trim());
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: unknown) {
            console.error("DIRECT MESSAGE UPDATE ERROR:",error);
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
    async deleteHandler(
        req: Request,
        res: Response): Promise<void> {
        try {
            const messageId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { userId } = req.body;
            if (!messageId || !userId) {
                throw new AppError("messageId and userId are required",400);
            }
            const existingMessage = await this.directMessageRepository.findById( messageId);
            if (!existingMessage) {
                throw new AppError("Direct message not found",404 );
            }
            if (existingMessage.senderId !== userId) {
                throw new AppError("You can only delete your own message",403);
            }
            const usecase = new DeleteDirectMessage(this.directMessageRepository );
            await usecase.execute(messageId);
            res.status(200).json({
                success: true,
                message: "Message deleted successfully"});
        } catch (error: unknown) {
            console.error("DIRECT MESSAGE DELETE ERROR:",error);
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
}