import {Router, type Request, type Response } from "express";
import { DepartmentRepository } from "@/src/adapters/repositories/departmentRepository.js";
import { AddDepartment } from "@/src/application/usecases/department/AddDepartment.js";
import { GetDepartments } from "@/src/application/usecases/department/GetAllDepartments.js";
import { GetDepartmentById } from "@/src/application/usecases/department/GetDepartmentById.js";
import { GetDepartmentByCode } from "@/src/application/usecases/department/GetDepartmentByCode.js";
import { GetDepartmentByName } from "@/src/application/usecases/department/GetDepartmentByName.js";
import { UpdateDepartment } from "@/src/application/usecases/department/UpdateDepartment.js";
import { DeleteDepartment } from "@/src/application/usecases/department/DeleteDepartment.js";
import { Logger } from "@/src/shared/logger.js";


export class DepartmentController{
    public router:Router=Router({mergeParams:true});
    private departmentRepository: DepartmentRepository;
     constructor(){
        this.departmentRepository=new DepartmentRepository();
        this.router.post("/",this.createHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/code/:code",this.getByCodeHandler.bind(this));
        this.router.get("/name/:name",this.getByNameHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.put("/:id",this.updateHandler.bind(this));
        this.router.delete("/:id",this.deleteHandler.bind(this));
     }
     async createHandler(req:Request,res:Response){
        try{
            const usecase=new AddDepartment(this.departmentRepository);
            const result=await usecase.execute(req.body);
            Logger.info("Department created successfully");
            res.status(201).json({ok:true,data:result});
        }catch(error:any){
            res.status(400).json({ok:false,error:error.message});
        }
     }
     async getAllHandler(req:Request,res:Response){
        try{
            const usecase=new GetDepartments(this.departmentRepository);
            const result=await usecase.execute();
            Logger.info("All departments fetched successfully");
            res.status(200).json({ok:true,data:result});
        }catch(error:any){
            res.status(500).json({ok:false,error:error.message});
        }
     }
     async getByCodeHandler(req:Request,res:Response){
        try{
            const code=req.params.code;
            if (!code||Array.isArray(code)){
                res.status(400).json({ok:false,error:"Invalid department code"});
                return;
            }
            const usecase=new GetDepartmentByCode(this.departmentRepository);
            const result=await usecase.execute(code);
            if(!result){
                res.status(404).json({ok:false,error:"Department not found"});
                return;
            }
            Logger.info(`Department fetched by code:${code}`);
            res.status(200).json({ok:true,data:result});
        }catch(error:any){
            res.status(400).json({ok:false,error:error.message});
        }
     }
     async getByNameHandler(req:Request,res:Response){
        try{
            const name=req.params.name;
            if(!name||Array.isArray(name)){
                res.status(400).json({ok:false,error:"Invalid department name"});
                return;
            }
            const usecase=new GetDepartmentByName(this.departmentRepository);
            const result=await usecase.execute(name);
            if(!result){
                res.status(404).json({ok:false,error:"Department not found"});
                return;
            }
            Logger.info(`Department fetched by name:${name}`);
            res.status(200).json({ok:true,data:result});
        }catch(error:any){
            res.status(400).json({ok:false,error:error.message});
        }
     }
      async getByIdHandler(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                res.status(400).json({
                    ok: false,
                    error: "Invalid department ID"
                });
                return;
            }

            const usecase = new GetDepartmentById(this.departmentRepository);
            const result = await usecase.execute(id);

            if (!result) {
                res.status(404).json({
                    ok: false,
                    error: "Department not found"
                });
                return;
            }

            Logger.info(`Department fetched by ID: ${id}`);
            res.status(200).json({
                ok: true,
                data: result
            });
        } catch (error: any) {
            res.status(400).json({
                ok: false,
                error: error.message
            });
        }
    }
    async updateHandler(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                res.status(400).json({
                    ok: false,
                    error: "Invalid department ID"
                });
                return;
            }

            const usecase = new UpdateDepartment(this.departmentRepository);
            const result = await usecase.execute(id, req.body);
            Logger.info(`Department updated successfully: ${id}`);
            res.status(200).json({
                ok: true,
                data: result
            });
        } catch (error: any) {
            res.status(400).json({
                ok: false,
                error: error.message
            });
        }
    }
     async deleteHandler(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                res.status(400).json({
                    ok: false,
                    error: "Invalid department ID"
                });
                return;
            }

            const usecase = new DeleteDepartment(this.departmentRepository);
            const result = await usecase.execute(id);
            Logger.info(`Department deleted successfully: ${id}`);
            res.status(200).json({
                ok: true,
                data: result
            });
        } catch (error: any) {
            res.status(400).json({
                ok: false,
                error: error.message
            });
        }
    }

}

