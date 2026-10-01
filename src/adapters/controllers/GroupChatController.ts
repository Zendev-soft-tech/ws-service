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

        this.router.post(
            "/",
            this.createHandler.bind(this)
        );

        this.router.get(
            "/user/:userId",
            this.getAllHandler.bind(this)
        );

        this.router.get(
            "/:id/user/:userId",
            this.getByIdHandler.bind(this)
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

    async createHandler(req: Request, res: Response) {
        try {
            const {
                name,
                createdBy
            } = req.body;

            if (!name || !createdBy) {
                throw new AppError(
                    "name and createdBy are required",
                    400
                );
            }

            const usecase = new CreateGroup(
                this.groupChatRepository,
                this.groupMemberRepository
            );

            const group = await usecase.execute(
                name,
                createdBy
            );

            res.status(201).json({
                success: true,
                data: group
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

            const usecase = new GetGroups(
                this.groupChatRepository
            );

            const groups = await usecase.execute(
                userId
            );

            res.status(200).json({
                success: true,
                data: groups
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

    async getByIdHandler(req: Request, res: Response) {
        try {
            const groupId =
                Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            const userId =
                Array.isArray(req.params.userId)
                    ? req.params.userId[0]
                    : req.params.userId;

            if (!groupId || !userId) {
                throw new AppError(
                    "Group ID and User ID are required",
                    400
                );
            }

            const usecase = new GetGroupById(
                this.groupChatRepository,
                this.groupMemberRepository
            );

            const group = await usecase.execute(
                groupId,
                userId
            );

            res.status(200).json({
                success: true,
                data: group
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
            const groupId =
                Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            const {
                userId,
                name
            } = req.body;

            if (!groupId || !userId || !name) {
                throw new AppError(
                    "Group ID, User ID and name are required",
                    400
                );
            }

            const usecase = new UpdateGroup(
                this.groupChatRepository,
                this.groupMemberRepository
            );

            const group = await usecase.execute(
                groupId,
                userId,
                name
            );

            res.status(200).json({
                success: true,
                data: group
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
            const groupId =
                Array.isArray(req.params.id)
                    ? req.params.id[0]
                    : req.params.id;

            const userId = req.body.userId;

            if (!groupId || !userId) {
                throw new AppError(
                    "Group ID and User ID are required",
                    400
                );
            }

            const usecase = new DeleteGroup(
                this.groupChatRepository,
                this.groupMemberRepository
            );

            await usecase.execute(
                groupId,
                userId
            );

            res.status(200).json({
                success: true,
                message: "Group deleted successfully"
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
