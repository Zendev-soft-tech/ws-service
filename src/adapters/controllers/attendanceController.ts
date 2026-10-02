import {Router, type Request,type Response} from "express";
import { AttendanceRepository } from "@/src/adapters/repositories/attendanceRepository.js";
import { CheckIn } from "@/src/application/usecases/attendance/CheckIn.js";
import { CheckOut } from "@/src/application/usecases/attendance/CheckOut.js";
import { GetAttendance } from "@/src/application/usecases/attendance/GetAllAttendance.js";
import { GetEmployeeAttendance } from "@/src/application/usecases/attendance/GetEmployeeAttendance.js";
import { Logger } from "@/src/shared/logger.js";


export class AttendanceController{
    public router:Router=Router({mergeParams:true});
    private attendanceRepository:AttendanceRepository;
    constructor(){
        this.attendanceRepository=new AttendanceRepository();
        this.router.post("/check-in",this.checkInHandler.bind(this));
        this.router.post("/check-out",this.checkOutHandler.bind(this));
        this.router.get("/",this.getAllHandler.bind(this));
        this.router.get("/employee/:employeeId",this.getByEmployeeHandler.bind(this));
    }
    async checkInHandler(req:Request,res:Response){
        try{
            const usecase=new CheckIn(this.attendanceRepository);
            const result=await usecase.execute(req.body.employeeId);
            Logger.info("Employee checked in successfully");
            res.status(201).json({ok:true,data:result});
        }catch (error:any){
            res.status(400).json({ok:false,error:error.message});
        }
    }
    async checkOutHandler (req:Request,res:Response){
        try{
            const usecase=new CheckOut(this.attendanceRepository);
            const result=await usecase.execute(req.body.employeeId);
            Logger.info("Employee checked out successfully");
            res.status(200).json({ok:true,data:result});
        }catch (error:any){
            res.status(400).json({ok:false,error:error.message});
        }
    }
    async getAllHandler (req:Request,res:Response){
        try{
            const usecase=new GetAttendance(this.attendanceRepository);
            const result=await usecase.execute();
            Logger.info("All attendance records fetched successfully");
            res.status(200).json({ok:true,data:result});
        }catch (error:any){
            res.status(500).json({ok:false,error:error.message});
        }
    }
    async getByEmployeeHandler (req:Request,res:Response){
        try{
            const employeeId=req.params.employeeId;
            if (!employeeId || Array.isArray(employeeId)) {
            res.status(400).json({
                ok: false,
                error:("Invalid employee ID")
            });
            return;
        }
            const usecase=new GetEmployeeAttendance(this.attendanceRepository);
            const result=await usecase.execute(employeeId);
            Logger.info(`Attendance records fetched for employee: ${employeeId}`);
            res.status(200).json({ok:true,data:result});
        }catch (error:any){
            res.status(400).json({ok:false,error:error.message});
        }
    }
}