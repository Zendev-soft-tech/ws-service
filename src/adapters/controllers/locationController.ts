import { Router,type Request,type Response } from "express";
import { LocationRepository } from "@/src/adapters/repositories/locationRepository.js";
import { AddLocation } from "@/src/application/usecases/location/AddLocation.js";
import { GetLocations } from "@/src/application/usecases/location/GetLocations.js";
import { GetLocationById } from "@/src/application/usecases/location/GetLocationById.js";
import { GetLocationByCode } from "@/src/application/usecases/location/GetLocationByCode.js";
import { GetLocationByName } from "@/src/application/usecases/location/GetLocationByName.js";
import { GetLocationsByCity } from "@/src/application/usecases/location/GetLocationsByCity.js";
import { UpdateLocation } from "@/src/application/usecases/location/UpdateLocation.js";
import { DeleteLocation } from "@/src/application/usecases/location/DeleteLocation.js";
import { Logger } from "@/src/shared/logger.js";

export class LocationController {
    public router:Router=Router({mergeParams:true});
    private locationRepository:LocationRepository;

    constructor() {
        this.locationRepository=new LocationRepository();
        this.router.post("/",this.createHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/code/:code",this.getByCodeHandler.bind(this));
        this.router.get("/name/:name",this.getByNameHandler.bind(this));
        this.router.get("/city/:city",this.getByCityHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.put("/:id",this.updateHandler.bind(this));
        this.router.delete("/:id",this.deleteHandler.bind(this));
    }

    async createHandler(req:Request,res:Response) {
        try {
            const usecase=new AddLocation(this.locationRepository);
            const result=await usecase.execute(req.body);
            Logger.info("Location created successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getAllHandler(req:Request,res:Response) {
        try {
            const usecase=new GetLocations(this.locationRepository);
            const result=await usecase.execute();
            Logger.info("All locations fetched successfully");
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(500).json({ok:false,error:error.message});
        }
    }

    async getByIdHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid location ID"});
                return;
            }
            const usecase=new GetLocationById(this.locationRepository);
            const result=await usecase.execute(id);
            if(!result) {
                res.status(404).json({ok:false,error:"Location not found"});
                return;
            }
            Logger.info(`Location fetched by ID: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByCodeHandler(req:Request,res:Response) {
        try {
            const code=req.params.code;
            if(!code||Array.isArray(code)) {
                res.status(400).json({ok:false,error:"Invalid location code"});
                return;
            }
            const usecase=new GetLocationByCode(this.locationRepository);
            const result=await usecase.execute(code);
            if(!result) {
                res.status(404).json({ok:false,error:"Location not found"});
                return;
            }
            Logger.info(`Location fetched by code: ${code}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByNameHandler(req:Request,res:Response) {
        try {
            const name=req.params.name;
            if(!name||Array.isArray(name)) {
                res.status(400).json({ok:false,error:"Invalid location name"});
                return;
            }
            const usecase=new GetLocationByName(this.locationRepository);
            const result=await usecase.execute(name);
            if(!result) {
                res.status(404).json({ok:false,error:"Location not found"});
                return;
            }
            Logger.info(`Location fetched by name: ${name}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByCityHandler(req:Request,res:Response) {
        try {
            const city=req.params.city;
            if(!city||Array.isArray(city)) {
                res.status(400).json({ok:false,error:"Invalid city"});
                return;
            }
            const usecase=new GetLocationsByCity(this.locationRepository);
            const result=await usecase.execute(city);
            Logger.info(`Locations fetched by city: ${city}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async updateHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid location ID"});
                return;
            }
            const usecase=new UpdateLocation(this.locationRepository);
            const result=await usecase.execute(id,req.body);
            Logger.info(`Location updated successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async deleteHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid location ID"});
                return;
            }
            const usecase=new DeleteLocation(this.locationRepository);
            const result=await usecase.execute(id);
            Logger.info(`Location deleted successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }
}