import { Router } from "express";
import * as userController from "@/src/adapters/controllers/userController.js";
import * as employeeController from "@/src/adapters/controllers/employeeController.js";
import * as departmentController from "@/src/adapters/controllers/departmentController.js";
import * as designationController from "@/src/adapters/controllers/designationController.js";
import * as locationController from "@/src/adapters/controllers/locationController.js";
import * as attendanceController from "@/src/adapters/controllers/attendanceController.js";
import * as leaveController from "@/src/adapters/controllers/leaveController.js";
import * as salaryController from "@/src/adapters/controllers/salaryController.js";
import { authMiddleware, hrAdminMiddleware } from "@/src/frameworks/middleware.js";

const router = Router();

/* USER */
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", authMiddleware, userController.getAll);
router.get("/users/:id", authMiddleware, userController.getById);
router.get("/users/email/:email", authMiddleware, userController.getByEmail);
router.put("/users/:id", authMiddleware, userController.update);
router.delete("/users/:id", authMiddleware, userController.remove);

/* EMPLOYEE */
router.post("/employees", authMiddleware, employeeController.create);
router.get("/employees", authMiddleware, employeeController.getAll);
router.get("/employees/:id", authMiddleware, employeeController.getOne);
router.get("/employees/email/:email", authMiddleware, employeeController.getByEmail);
router.get("/employees/number/:employeeNumber", authMiddleware, employeeController.getByNumber);
router.get("/employees/department/:departmentId", authMiddleware, employeeController.getByDepartment);
router.get("/employees/designation/:designationId", authMiddleware, employeeController.getByDesignation);
router.get("/employees/location/:locationId", authMiddleware, employeeController.getByLocation);
router.put("/employees/:id", authMiddleware, employeeController.update);
router.delete("/employees/:id", authMiddleware, employeeController.remove);

/* DEPARTMENT */
router.post("/departments", authMiddleware, departmentController.create);
router.get("/departments", authMiddleware, departmentController.getAll);
router.get("/departments/:id", authMiddleware, departmentController.getById);
router.get("/departments/code/:code", authMiddleware, departmentController.getByCode);
router.get("/departments/name/:name", authMiddleware, departmentController.getByName);
router.put("/departments/:id", authMiddleware, departmentController.updateDepartment);
router.delete("/departments/:id", authMiddleware, departmentController.removeDepartment);

/* DESIGNATION */
router.post("/designations", authMiddleware, designationController.create);
router.get("/designations", authMiddleware, designationController.getAll);
router.get("/designations/:id", authMiddleware, designationController.getById);
router.get("/designations/code/:code", authMiddleware, designationController.getByCode);
router.get("/designations/name/:name", authMiddleware, designationController.getByName);
router.get("/designations/department/:departmentId", authMiddleware, designationController.getByDepartment);
router.put("/designations/:id", authMiddleware, designationController.updateDesignation);
router.delete("/designations/:id", authMiddleware, designationController.removeDesignation);

/* LOCATION */
router.post("/locations", authMiddleware, locationController.create);
router.get("/locations", authMiddleware, locationController.getAll);
router.get("/locations/:id", authMiddleware, locationController.getById);
router.get("/locations/code/:code", authMiddleware, locationController.getByCode);
router.get("/locations/name/:name", authMiddleware, locationController.getByName);
router.get("/locations/city/:city", authMiddleware, locationController.getByCity);
router.put("/locations/:id", authMiddleware, locationController.updateLocation);
router.delete("/locations/:id", authMiddleware, locationController.removeLocation);

/* ATTENDANCE */
router.post("/attendance/check-in", authMiddleware, attendanceController.checkInEmployee);
router.post("/attendance/check-out", authMiddleware, attendanceController.checkOutEmployee);
router.get("/attendance", authMiddleware, attendanceController.getAll);
router.get("/attendance/employee/:employeeId", authMiddleware, attendanceController.getByEmployee);

/* LEAVE */
router.post("/leaves", authMiddleware, leaveController.applyLeaveController);
router.get("/leaves", authMiddleware, leaveController.getLeavesController);
router.get("/leaves/:id", authMiddleware, leaveController.getLeaveByIdController);
router.get("/leaves/employee/:employeeId", authMiddleware, leaveController.getLeavesByEmployeeController);
router.get("/leaves/status/:status", authMiddleware, leaveController.getLeavesByStatusController);
router.get("/leaves/balance/:employeeId", authMiddleware, leaveController.getLeaveBalanceController);
router.patch("/leaves/:id/approve", authMiddleware, hrAdminMiddleware, leaveController.approveLeaveController);
router.patch("/leaves/:id/reject", authMiddleware, hrAdminMiddleware, leaveController.rejectLeaveController);

/* SALARY */
router.post("/salaries", authMiddleware, salaryController.create);
router.get("/salaries/:employeeId", authMiddleware, salaryController.getSalary);
router.put("/salaries/:employeeId", authMiddleware, salaryController.updateSalary);
router.delete("/salaries/:employeeId", authMiddleware, salaryController.deleteSalary);

export default router;