import { Router,type Request,type Response } from "express";
import { OrganizationRepository } from "@/src/adapters//repositories/organizationRepository.js";
import { AddOrganization } from "@/src/application/usecases/organization/AddOrganization.js";
import { GetOrganizations } from "@/src/application/usecases/organization/GetOrganizations.js";
import { GetOrganizationById } from "@/src/application/usecases/organization/GetOrganizationById.js";
import { GetOrganizationByName } from "@/src/application/usecases/organization/GetOrganizationByName.js";
import { UpdateOrganization } from "@/src/application/usecases/organization/UpdateOrganization.js";
import { DeleteOrganization } from "@/src/application/usecases/organization/DeleteOrganization.js";
import { Logger } from "@/src/shared/logger.js";

export class OrganizationController{
    public router:Router=Router({mergeParams:true});
    private organizationRepository:OrganizationRepository;
    constructor (){
        this.organizationRepository=new OrganizationRepository();

        this.router.post("/",this.createHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/name/:name",this.getByNameHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.put("/:id",this.updateHandler.bind(this));
        this.router.delete("/:id",this.deleteHandler.bind(this));
    }
     async createHandler(req:Request,res:Response) {
        try {
            const usecase=new AddOrganization(this.organizationRepository);
            const result=await usecase.execute(req.body);

            Logger.info("Organization created successfully");

            res.status(201).json({
                ok:true,
                data:result
            });
        } catch(error:any) {
            res.status(400).json({
                ok:false,
                error:error.message
            });
        }
    }
    async getAllHandler(req:Request,res:Response) {
        try {
            const usecase=new GetOrganizations(this.organizationRepository);
            const result=await usecase.execute();

            Logger.info("All organizations fetched successfully");

            res.status(200).json({
                ok:true,
                data:result
            });
        } catch(error:any) {
            res.status(500).json({
                ok:false,
                error:error.message
            });
        }
    }
    async getByNameHandler(req:Request,res:Response) {
        try {
            const name=req.params.name;

            if(!name||Array.isArray(name)) {
                res.status(400).json({
                    ok:false,
                    error:"Invalid organization name"
                });
                return;
            }

            const usecase=new GetOrganizationByName(this.organizationRepository);
            const result=await usecase.execute(name);

            if(!result) {
                res.status(404).json({
                    ok:false,
                    error:"Organization not found"
                });
                return;
            }

            Logger.info(`Organization fetched by name: ${name}`);
            res.status(200).json({
                ok:true,
                data:result
            });
        } catch(error:any) {
            res.status(400).json({
                ok:false,
                error:error.message
            });
        }
    }
    async getByIdHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;

            if(!id||Array.isArray(id)) {
                res.status(400).json({
                    ok:false,
                    error:"Invalid organization ID"
                });
                return;
            }

            const usecase=new GetOrganizationById(this.organizationRepository);
            const result=await usecase.execute(id);

            if(!result) {
                res.status(404).json({
                    ok:false,
                    error:"Organization not found"
                });
                return;
            }
            Logger.info(`Organization fetched by ID: ${id}`);

            res.status(200).json({
                ok:true,
                data:result
            });
        } catch(error:any) {
            res.status(400).json({
                ok:false,
                error:error.message
            });
        }
    }
     async updateHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;

            if(!id||Array.isArray(id)) {
                res.status(400).json({
                    ok:false,
                    error:"Invalid organization ID"
                });
                return;
            }

            const usecase=new UpdateOrganization(this.organizationRepository);
            const result=await usecase.execute(id,req.body);

            Logger.info(`Organization updated successfully: ${id}`);

            res.status(200).json({
                ok:true,
                data:result
            });
        } catch(error:any) {
            res.status(400).json({
                ok:false,
                error:error.message
            });
        }
    }
    async deleteHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;

            if(!id||Array.isArray(id)) {
                res.status(400).json({
                    ok:false,
                    error:"Invalid organization ID"
                });
                return;
            }

            const usecase=new DeleteOrganization(this.organizationRepository);
            const result=await usecase.execute(id);

            Logger.info(`Organization deleted successfully: ${id}`);

            res.status(200).json({
                ok:true,
                data:result
            });
        } catch(error:any) {
            res.status(404).json({
                ok:false,
                error:error.message
            });
        }
    }       

}
