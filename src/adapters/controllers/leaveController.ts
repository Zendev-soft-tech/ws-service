import { Router,type Request,type Response } from "express";
import type { AuthRequest } from "@/src/frameworks/middleware.js";
import { LeaveRepository } from "@/src/adapters/repositories/leaveRepository.js";
import { ApplyLeave } from "@/src/application/usecases/leave/ApplyLeave.js";
import { GetLeaves } from "@/src/application/usecases/leave/GetLeaves.js";
import { GetLeaveById } from "@/src/application/usecases/leave/GetLeaveById.js";
import { GetLeavesByEmployee } from "@/src/application/usecases/leave/GetLeavesByEmployee.js";
import { GetLeavesByStatus } from "@/src/application/usecases/leave/GetLeavesByStatus.js";
import { ApproveLeave } from "@/src/application/usecases/leave/ApproveLeave.js";
import { RejectLeave } from "@/src/application/usecases/leave/RejectLeave.js";
import { GetLeaveBalance } from "@/src/application/usecases/leave/GetLeaveBalance.js";
import { hrAdminMiddleware } from "@/src/frameworks/middleware.js";
import { Logger } from "@/src/shared/logger.js";

export class LeaveController {
    public router:Router=Router({mergeParams:true});
    private leaveRepository:LeaveRepository;

    constructor() {
        this.leaveRepository=new LeaveRepository();
        this.router.post("/",this.applyHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/employee",this.getByEmployeeHandler.bind(this));
        this.router.get("/balance",this.getBalanceHandler.bind(this));
        this.router.get("/status/:status",this.getByStatusHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.patch("/:id/approve",hrAdminMiddleware,this.approveHandler.bind(this));
        this.router.patch("/:id/reject",hrAdminMiddleware,this.rejectHandler.bind(this));
    }

    async applyHandler(req:AuthRequest,res:Response) {
        try {
            if(!req.employeeId) {
                res.status(401).json({ok:false,error:"Employee ID not found in token"});
                return;
            }
            const usecase=new ApplyLeave(this.leaveRepository);
            const {leaveType,dayType,fromDate,toDate,reason}=req.body;
            const result=await usecase.execute({
                employeeId:req.employeeId,
                leaveType,
                dayType,
                fromDate,
                toDate,
                reason
            });
            Logger.info("Leave applied successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getAllHandler(req:Request,res:Response) {
        try {
            const usecase=new GetLeaves(this.leaveRepository);
            const result=await usecase.execute();
            Logger.info("All leaves fetched successfully");
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
            const usecase=new GetLeavesByEmployee(this.leaveRepository);
            const result=await usecase.execute(req.employeeId);
            Logger.info(`Leaves fetched for employee: ${req.employeeId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getBalanceHandler(req:AuthRequest,res:Response) {
        try {
            if(!req.employeeId) {
                res.status(401).json({ok:false,error:"Employee ID not found in token"});
                return;
            }
            const usecase=new GetLeaveBalance(this.leaveRepository);
            const result=await usecase.execute(req.employeeId);
            Logger.info(`Leave balance fetched for employee: ${req.employeeId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByStatusHandler(req:Request,res:Response) {
        try {
            const status=req.params.status;
            if(!status||Array.isArray(status)) {
                res.status(400).json({ok:false,error:"Invalid leave status"});
                return;
            }
            const usecase=new GetLeavesByStatus(this.leaveRepository);
            const result=await usecase.execute(status);
            Logger.info(`Leaves fetched by status: ${status}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByIdHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid leave ID"});
                return;
            }
            const usecase=new GetLeaveById(this.leaveRepository);
            const result=await usecase.execute(id);
            if(!result) {
                res.status(404).json({ok:false,error:"Leave not found"});
                return;
            }
            Logger.info(`Leave fetched by ID: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async approveHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid leave ID"});
                return;
            }
            const usecase=new ApproveLeave(this.leaveRepository);
            const result=await usecase.execute(id);
            Logger.info(`Leave approved successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async rejectHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid leave ID"});
                return;
            }
            const usecase=new RejectLeave(this.leaveRepository);
            const result=await usecase.execute(id,req.body.rejectionReason);
            Logger.info(`Leave rejected successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }
}