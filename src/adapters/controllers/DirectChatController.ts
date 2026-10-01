import type { Request, Response } from "express";
import { Router } from "express";

import { DirectChatRepository } from "@/src/adapters/repositories/DirectChatRepository.js";

import { CreateDirectChat } from "@/src/application/usecases/chat/direct/CreateDirectChat.js";
import { GetDirectChats } from "@/src/application/usecases/chat/direct/GetDirectChats.js";
import { GetDirectChatById } from "@/src/application/usecases/chat/direct/GetDirectChatById.js";

import { AppError } from "@/src/shared/error.js";

export class DirectChatController {
    public router: Router = Router();

    private directChatRepository: DirectChatRepository;

    constructor() {
        this.directChatRepository = new DirectChatRepository();

        this.router.post(
            "/",
            this.createHandler.bind(this)
        );

        this.router.get(
            "/user/:userId",
            this.getAllHandler.bind(this)
        );

        this.router.get(
            "/:id",
            this.getByIdHandler.bind(this)
        );
    }

    async createHandler(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const {
                userOneId,
                userTwoId
            } = req.body;

            const usecase =
                new CreateDirectChat(
                    this.directChatRepository
                );

            const chat =
                await usecase.execute(
                    userOneId,
                    userTwoId
                );

            res.status(201).json({
                success: true,
                data: chat
            });
        } catch (error: unknown) {
            console.error(
                "DIRECT CHAT CREATE ERROR:",
                error
            );

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

    async getAllHandler(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const userId =
                Array.isArray(req.params.userId)
                    ? req.params.userId[0]
                    : req.params.userId;

            if (!userId) {
                throw new AppError(
                    "User ID is required",
                    400
                );
            }

            const usecase =
                new GetDirectChats(
                    this.directChatRepository
                );

            const chats =
                await usecase.execute(userId);

            res.status(200).json({
                success: true,
                data: chats
            });
        } catch (error: unknown) {
            console.error(
                "DIRECT CHAT GET ALL ERROR:",
                error
            );

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

    async getByIdHandler(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const id =
                Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            if (!id) {
                throw new AppError(
                    "Chat ID is required",
                    400
                );
            }

            const usecase =
                new GetDirectChatById(
                    this.directChatRepository
                );

            const chat =
                await usecase.execute(id);

            res.status(200).json({
                success: true,
                data: chat
            });
        } catch (error: unknown) {
            console.error(
                "DIRECT CHAT GET BY ID ERROR:",
                error
            );

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