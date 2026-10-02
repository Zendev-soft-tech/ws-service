import { Router,type Request,type Response } from "express";
import { EmployeeRepository } from "@/src/adapters/repositories/employeeRepository.js";
import { AddEmployee } from "@/src/application/usecases/employee/AddEmployee.js";
import { GetEmployees } from "@/src/application/usecases/employee/GetAllEmployees.js";
import { GetEmployeeById } from "@/src/application/usecases/employee/GetEmployeeById.js";
import { GetEmployeeByEmail } from "@/src/application/usecases/employee/GetEmployeeByEmail.js";
import { GetEmployeeByNumber } from "@/src/application/usecases/employee/GetEmployeeByNumber.js";
import { GetEmployeesByDepartment } from "@/src/application/usecases/employee/GetEmployeesByDepartment.js";
import { GetEmployeesByDesignation } from "@/src/application/usecases/employee/GetEmployeesByDesignation.js";
import { GetEmployeesByLocation } from "@/src/application/usecases/employee/GetEmployeesByLocation.js";
import { UpdateEmployee } from "@/src/application/usecases/employee/UpdateEmployee.js";
import { DeleteEmployee } from "@/src/application/usecases/employee/deleteEmployee.js";
import { hrAdminMiddleware } from "@/src/frameworks/middleware.js";
import { Logger } from "@/src/shared/logger.js";

export class EmployeeController {
    public router:Router=Router({mergeParams:true});
    private employeeRepository:EmployeeRepository;

    constructor() {
        this.employeeRepository=new EmployeeRepository();
        this.router.post("/",hrAdminMiddleware,this.createHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/email/:email",this.getByEmailHandler.bind(this));
        this.router.get("/number/:employeeNumber",this.getByNumberHandler.bind(this));
        this.router.get("/department/:departmentId",this.getByDepartmentHandler.bind(this));
        this.router.get("/designation/:designationId",this.getByDesignationHandler.bind(this));
        this.router.get("/location/:locationId",this.getByLocationHandler.bind(this));
        this.router.get("/:id",this.getByIdHandler.bind(this));
        this.router.put("/:id",this.updateHandler.bind(this));
        this.router.delete("/:id",this.deleteHandler.bind(this));
    }

    async createHandler(req:Request,res:Response) {
        try {
            const usecase=new AddEmployee(this.employeeRepository);
            const result=await usecase.execute(req.body);
            Logger.info("Employee created successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getAllHandler(req:Request,res:Response) {
        try {
            const usecase=new GetEmployees(this.employeeRepository);
            const result=await usecase.execute();
            Logger.info("All employees fetched successfully");
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(500).json({ok:false,error:error.message});
        }
    }

    async getByEmailHandler(req:Request,res:Response) {
        try {
            const email=req.params.email;
            if(!email||Array.isArray(email)) {
                res.status(400).json({ok:false,error:"Invalid employee email"});
                return;
            }
            const usecase=new GetEmployeeByEmail(this.employeeRepository);
            const result=await usecase.execute(email);
            if(!result) {
                res.status(404).json({ok:false,error:"Employee not found"});
                return;
            }
            Logger.info(`Employee fetched by email: ${email}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByNumberHandler(req:Request,res:Response) {
        try {
            const employeeNumber=req.params.employeeNumber;
            if(!employeeNumber||Array.isArray(employeeNumber)) {
                res.status(400).json({ok:false,error:"Invalid employee number"});
                return;
            }
            const usecase=new GetEmployeeByNumber(this.employeeRepository);
            const result=await usecase.execute(employeeNumber);
            if(!result) {
                res.status(404).json({ok:false,error:"Employee not found"});
                return;
            }
            Logger.info(`Employee fetched by number: ${employeeNumber}`);
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
            const usecase=new GetEmployeesByDepartment(this.employeeRepository);
            const result=await usecase.execute(departmentId);
            Logger.info(`Employees fetched for department: ${departmentId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByDesignationHandler(req:Request,res:Response) {
        try {
            const designationId=req.params.designationId;
            if(!designationId||Array.isArray(designationId)) {
                res.status(400).json({ok:false,error:"Invalid designation ID"});
                return;
            }
            const usecase=new GetEmployeesByDesignation(this.employeeRepository);
            const result=await usecase.execute(designationId);
            Logger.info(`Employees fetched for designation: ${designationId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByLocationHandler(req:Request,res:Response) {
        try {
            const locationId=req.params.locationId;
            if(!locationId||Array.isArray(locationId)) {
                res.status(400).json({ok:false,error:"Invalid location ID"});
                return;
            }
            const usecase=new GetEmployeesByLocation(this.employeeRepository);
            const result=await usecase.execute(locationId);
            Logger.info(`Employees fetched for location: ${locationId}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByIdHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid employee ID"});
                return;
            }
            const usecase=new GetEmployeeById(this.employeeRepository);
            const result=await usecase.execute(id);
            if(!result) {
                res.status(404).json({ok:false,error:"Employee not found"});
                return;
            }
            Logger.info(`Employee fetched by ID: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async updateHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid employee ID"});
                return;
            }
            const usecase=new UpdateEmployee(this.employeeRepository);
            const result=await usecase.execute(id,req.body);
            Logger.info(`Employee updated successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async deleteHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid employee ID"});
                return;
            }
            const usecase=new DeleteEmployee(this.employeeRepository);
            const result=await usecase.execute(id);
            Logger.info(`Employee deleted successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(404).json({ok:false,error:error.message});
        }
    }
}