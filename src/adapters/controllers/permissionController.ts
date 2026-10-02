import { Router,type Response } from "express";
import type { AuthRequest } from "@/src/frameworks/middleware.js";
import { PermissionRepository } from "@/src/adapters/repositories/permissionRepository.js";
import { ApplyPermission } from "@/src/application/usecases/permission/ApplyPermission.js";
import { GetPermissions } from "@/src/application/usecases/permission/GetPermissions.js";
import { GetPermissionById } from "@/src/application/usecases/permission/GetPermissionById.js";
import { GetPermissionsByEmployee } from "@/src/application/usecases/permission/GetPermissionsByEmployee.js";
import { ApprovePermission } from "@/src/application/usecases/permission/ApprovePermission.js";
import { RejectPermission } from "@/src/application/usecases/permission/RejectPermission.js";
import { hrAdminMiddleware,employeeMiddleware } from "@/src/frameworks/middleware.js";
import { Logger } from "@/src/shared/logger.js";

export class PermissionController {
    public router:Router=Router({mergeParams:true});
    private permissionRepository:PermissionRepository;

    constructor() {
        this.permissionRepository=new PermissionRepository();
        this.router.post("/",this.createHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/employee",this.getByEmployeeHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.patch("/:id/approve",hrAdminMiddleware,this.approveHandler.bind(this));
        this.router.patch("/:id/reject",hrAdminMiddleware,this.rejectHandler.bind(this));
    }

    async createHandler(req:AuthRequest,res:Response) {
        try {
            if(!req.employeeId) {
                res.status(401).json({ok:false,error:"Employee ID not found in token"});
                return;
            }
            const usecase=new ApplyPermission(this.permissionRepository);
            const result=await usecase.execute({
                employeeId:req.employeeId,
                date:req.body.date,
                fromTime:req.body.fromTime,
                toTime:req.body.toTime,
                reason:req.body.reason
            });
            Logger.info("Permission applied successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getAllHandler(req:AuthRequest,res:Response) {
        try {
            const usecase=new GetPermissions(this.permissionRepository);
            const result=await usecase.execute();
            Logger.info("All permissions fetched successfully");
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(500).json({ok:false,error:error.message});
        }
    }

    async getByEmployeeHandler(req:AuthRequest,res:Response) {
        try {
            if(!req.employeeId) {
                res.status(401).json({ok:false,error:"Employee ID not found in token"});
                return;
            }
            const usecase=new GetPermissionsByEmployee(this.permissionRepository);
            const result=await usecase.execute(req.employeeId);
            Logger.info(`Permissions fetched for employee: ${req.employeeId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByIdHandler(req:AuthRequest,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid permission ID"});
                return;
            }
            const usecase=new GetPermissionById(this.permissionRepository);
            const result=await usecase.execute(id);
            if(!result) {
                res.status(404).json({ok:false,error:"Permission not found"});
                return;
            }
            Logger.info(`Permission fetched by ID: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async approveHandler(req:AuthRequest,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid permission ID"});
                return;
            }
            const usecase=new ApprovePermission(this.permissionRepository);
            const result=await usecase.execute(id);
            Logger.info(`Permission approved successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async rejectHandler(req:AuthRequest,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid permission ID"});
                return;
            }
            const usecase=new RejectPermission(this.permissionRepository);
            const result=await usecase.execute(id,req.body.rejectionReason);
            Logger.info(`Permission rejected successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }
}