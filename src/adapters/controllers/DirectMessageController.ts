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

        this.router.post(
            "/",
            this.sendHandler.bind(this)
        );

        this.router.get(
            "/:chatId/user/:userId",
            this.getAllHandler.bind(this)
        );

        this.router.put(
            "/:id",
            this.updateHandler.bind(this)
        );

        this.router.delete(
            "/:id",
            this.deleteHandler.bind(this)
        );
    }

    async sendHandler(req: Request, res: Response) {
        try {
            const {
                chatId,
                senderId,
                message
            } = req.body;

            if (!chatId || !senderId || !message) {
                throw new AppError(
                    "chatId, senderId and message are required",
                    400
                );
            }

            const usecase = new SendDirectMessage(
                this.directMessageRepository,
                this.directChatRepository
            );

            const result = await usecase.execute(
                chatId,
                senderId,
                message
            );

            res.status(201).json({
                success: true,
                data: result
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
            const chatId =
                Array.isArray(req.params.chatId)
                    ? req.params.chatId[0]
                    : req.params.chatId;

            const userId =
                Array.isArray(req.params.userId)
                    ? req.params.userId[0]
                    : req.params.userId;

            if (!chatId || !userId) {
                throw new AppError(
                    "chatId and userId are required",
                    400
                );
            }

            const usecase = new GetDirectMessages(
                this.directMessageRepository,
                this.directChatRepository
            );

            const result = await usecase.execute(
                chatId,
                userId
            );

            res.status(200).json({
                success: true,
                data: result
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

    async updateHandler(req: Request, res: Response) {
        try {
            const messageId =
                Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            const {
                userId,
                message
            } = req.body;

            if (!messageId || !userId || !message) {
                throw new AppError(
                    "messageId, userId and message are required",
                    400
                );
            }

            const usecase = new UpdateDirectMessage(
                this.directMessageRepository,
                this.directChatRepository
            );

            const result = await usecase.execute(
                messageId,
                userId,
                message
            );

            res.status(200).json({
                success: true,
                data: result
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

    async deleteHandler(req: Request, res: Response) {
        try {
            const messageId =
                Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            const userId = req.body.userId;

            if (!messageId || !userId) {
                throw new AppError(
                    "messageId and userId are required",
                    400
                );
            }

            const usecase = new DeleteDirectMessage(
                this.directMessageRepository
            );

            await usecase.execute(
                messageId,
                userId
            );

            res.status(200).json({
                success: true,
                message: "Message deleted successfully"
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
