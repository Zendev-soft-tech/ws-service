import { Router,type Request,type Response } from "express";
import { UserRepository } from "@/src/adapters/repositories/userRepository.js";
import { EmployeeRepository } from "@/src/adapters/repositories/employeeRepository.js";
import { RegisterUser } from "@/src/application/usecases/user/RegisterUser.js";
import { LoginUser } from "@/src/application/usecases/user/LoginUser.js";
import { GetUsers } from "@/src/application/usecases/user/GetUsers.js";
import { GetUserById } from "@/src/application/usecases/user/GetUserById.js";
import { GetUserByEmail } from "@/src/application/usecases/user/GetUserByEmail.js";
import { UpdateUser } from "@/src/application/usecases/user/UpdateUser.js";
import { DeleteUser } from "@/src/application/usecases/user/DeleteUser.js";
import { Logger } from "@/src/shared/logger.js";
import { authMiddleware } from "@/src/frameworks/middleware.js";

export class UserController {
    public router:Router=Router({mergeParams:true});
    private userRepository:UserRepository;
    private employeeRepository:EmployeeRepository;

    constructor() {
        this.userRepository=new UserRepository();
        this.employeeRepository=new EmployeeRepository();
        this.router.post("/register",this.registerHandler.bind(this));
        this.router.post("/login",this.loginHandler.bind(this));
        this.router.get("/",authMiddleware,this.getAllHandler.bind(this));
        this.router.get("/email/:email",authMiddleware,this.getByEmailHandler.bind(this));
        this.router.get("/:id",authMiddleware,this.getByIdHandler.bind(this));
        this.router.put("/:id",authMiddleware,this.updateHandler.bind(this));
        this.router.delete("/:id",authMiddleware,this.deleteHandler.bind(this));
    }

    async registerHandler(req:Request,res:Response) {
        try {
            const usecase=new RegisterUser(this.userRepository);
            const {email,password}=req.body;
            const result=await usecase.execute(email,password);
            Logger.info("User registered successfully");
            res.status(201).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async loginHandler(req:Request,res:Response) {
        try {
            const usecase=new LoginUser(
                this.userRepository,
                this.employeeRepository
            );
            const {email,password}=req.body;
            const result=await usecase.execute(email,password);
            Logger.info("User logged in successfully");
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(401).json({ok:false,error:error.message});
        }
    }

    async getAllHandler(req:Request,res:Response) {
        try {
            const usecase=new GetUsers(this.userRepository);
            const result=await usecase.execute();
            Logger.info("All users fetched successfully");
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(500).json({ok:false,error:error.message});
        }
    }

    async getByIdHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid user ID"});
                return;
            }
            const usecase=new GetUserById(this.userRepository);
            const result=await usecase.execute(id);
            if(!result) {
                res.status(404).json({ok:false,error:"User not found"});
                return;
            }
            Logger.info(`User fetched by ID: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async getByEmailHandler(req:Request,res:Response) {
        try {
            const email=req.params.email;
            if(!email||Array.isArray(email)) {
                res.status(400).json({ok:false,error:"Invalid user email"});
                return;
            }
            const usecase=new GetUserByEmail(this.userRepository);
            const result=await usecase.execute(email);
            if(!result) {
                res.status(404).json({ok:false,error:"User not found"});
                return;
            }
            Logger.info(`User fetched by email: ${email}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async updateHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid user ID"});
                return;
            }
            const usecase=new UpdateUser(this.userRepository);
            const result=await usecase.execute(id,req.body);
            Logger.info(`User updated successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }

    async deleteHandler(req:Request,res:Response) {
        try {
            const id=req.params.id;
            if(!id||Array.isArray(id)) {
                res.status(400).json({ok:false,error:"Invalid user ID"});
                return;
            }
            const usecase=new DeleteUser(this.userRepository);
            const result=await usecase.execute(id);
            Logger.info(`User deleted successfully: ${id}`);
            res.status(200).json({ok:true,data:result});
        } catch(error:any) {
            res.status(400).json({ok:false,error:error.message});
        }
    }
}