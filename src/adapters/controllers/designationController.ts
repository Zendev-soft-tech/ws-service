import { Router,type Request,type Response } from "express";
import { DesignationRepository } from "@/src/adapters/repositories/designationRepository.js";
import { AddDesignation } from "@/src/application/usecases/designation/AddDesignation.js";
import { GetDesignations } from "@/src/application/usecases/designation/GetAllDesignations.js";
import { GetDesignationById } from "@/src/application/usecases/designation/GetDesignationById.js";
import { GetDesignationByCode } from "@/src/application/usecases/designation/GetDesignationByCode.js";
import { GetDesignationByName } from "@/src/application/usecases/designation/GetDesignationByName.js";
import { GetDesignationsByDepartment } from "@/src/application/usecases/designation/GetDesignationsByDepartment.js";
import { UpdateDesignation } from "@/src/application/usecases/designation/UpdateDesignation.js";
import { DeleteDesignation } from "@/src/application/usecases/designation/DeleteDesignation.js";
import { Logger } from "@/src/shared/logger.js";

export class DesignationController {
    public router:Router=Router({mergeParams:true});
    private designationRepository:DesignationRepository;

    constructor() {
        this.designationRepository=new DesignationRepository();
        this.router.post("/",this.createHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/code/:code",this.getByCodeHandler.bind(this));
        this.router.get("/name/:name",this.getByNameHandler.bind(this));
        this.router.get("/department/:departmentId",this.getByDepartmentHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.put("/:id",this.updateHandler.bind(this));
        this.router.delete("/:id",this.deleteHandler.bind(this));
    }

    async createHandler(req:Request,res:Response) {
        try {
            const usecase=new AddDesignation(this.designationRepository);
            const result=await usecase.execute(req.body);
            Logger.info("Designation created successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getAllHandler(req:Request,res:Response) {
        try {
            const usecase=new GetDesignations(this.designationRepository);
            const result=await usecase.execute();
            Logger.info("All designations fetched successfully");
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(500).json({ok:false,error:error.message});
        }
    }

    async getByCodeHandler(req:Request,res:Response) {
        try {
            const code=req.params.code;
            if(!code||Array.isArray(code)) {
                res.status(400).json({ok:false,error:"Invalid designation code"});
                return;
            }
            const usecase=new GetDesignationByCode(this.designationRepository);
            const result=await usecase.execute(code);
            if(!result) {
                res.status(404).json({ok:false,error:"Designation not found"});
                return;
            }
            Logger.info(`Designation fetched by code: ${code}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByNameHandler(req:Request,res:Response) {
        try {
            const name=req.params.name;
            if(!name||Array.isArray(name)) {
                res.status(400).json({ok:false,error:"Invalid designation name"});
                return;
            }
            const usecase=new GetDesignationByName(this.designationRepository);
            const result=await usecase.execute(name);
            if(!result) {
                res.status(404).json({ok:false,error:"Designation not found"});
                return;
            }
            Logger.info(`Designation fetched by name: ${name}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByDepartmentHandler(req:Request,res:Response) {
        try {
            const departmentId=req.params.departmentId;
            if(!departmentId||Array.isArray(departmentId)) {
                res.status(400).json({ok:false,error:"Invalid department ID"});
                return;
            }
            const usecase=new GetDesignationsByDepartment(this.designationRepository);
            const result=await usecase.execute(departmentId);
            Logger.info(`Designations fetched for department: ${departmentId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByIdHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid designation ID"});
                return;
            }
            const usecase=new GetDesignationById(this.designationRepository);
            const result=await usecase.execute(id);
            if(!result) {
                res.status(404).json({ok:false,error:"Designation not found"});
                return;
            }
            Logger.info(`Designation fetched by ID: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async updateHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid designation ID"});
                return;
            }
            const usecase=new UpdateDesignation(this.designationRepository);
            const result=await usecase.execute(id,req.body);
            Logger.info(`Designation updated successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async deleteHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid designation ID"});
                return;
            }
            const usecase=new DeleteDesignation(this.designationRepository);
            const result=await usecase.execute(id);
            Logger.info(`Designation deleted successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }
}