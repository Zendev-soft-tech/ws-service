import { Router,type Request,type Response } from "express";
import { SalaryRepository } from "@/src/adapters/repositories/salaryRepository.js";
import { AddSalary } from "@/src/application/usecases/salary/AddSalary.js";
import { GetSalary } from "@/src/application/usecases/salary/GetSalary.js";
import { UpdateSalary } from "@/src/application/usecases/salary/UpdateSalary.js";
import { DeleteSalary } from "@/src/application/usecases/salary/DeleteSalary.js";
import { Logger } from "@/src/shared/logger.js";

export class SalaryController {
    public router:Router=Router({mergeParams:true});
    private salaryRepository:SalaryRepository;

    constructor() {
        this.salaryRepository=new SalaryRepository();
        this.router.post("/",this.createHandler.bind(this));
        this.router.get("/:employeeId",this.getHandler.bind(this));
        this.router.put("/:employeeId",this.updateHandler.bind(this));
        this.router.delete("/:employeeId",this.deleteHandler.bind(this));
    }

    async createHandler(req:Request,res:Response) {
        try {
            const usecase=new AddSalary(this.salaryRepository);
            const result=await usecase.execute(req.body);
            Logger.info("Salary created successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getHandler(req:Request,res:Response) {
        try {
            const employeeId=req.params.employeeId;
            if(!employeeId||Array.isArray(employeeId)) {
                res.status(400).json({ok:false,error:"Invalid employee ID"});
                return;
            }
            const usecase=new GetSalary(this.salaryRepository);
            const result=await usecase.execute(employeeId);
            if(!result) {
                res.status(404).json({ok:false,error:"Salary not found"});
                return;
            }
            Logger.info(`Salary fetched for employee: ${employeeId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async updateHandler(req:Request,res:Response) {
        try {
            const employeeId=req.params.employeeId;
            if(!employeeId||Array.isArray(employeeId)) {
                res.status(400).json({ok:false,error:"Invalid employee ID"});
                return;
            }
            const usecase=new UpdateSalary(this.salaryRepository);
            const result=await usecase.execute(employeeId,req.body);
            Logger.info(`Salary updated successfully: ${employeeId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async deleteHandler(req:Request,res:Response) {
        try {
            const employeeId=req.params.employeeId;
            if(!employeeId||Array.isArray(employeeId)) {
                res.status(400).json({ok:false,error:"Invalid employee ID"});
                return;
            }
            const usecase=new DeleteSalary(this.salaryRepository);
            const result=await usecase.execute(employeeId);
            Logger.info(`Salary deleted successfully: ${employeeId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }
}