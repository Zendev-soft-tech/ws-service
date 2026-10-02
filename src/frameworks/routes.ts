import { Router } from "express";
import { UserController } from "@/src/adapters/controllers/userController.js";
import { EmployeeController } from "@/src/adapters/controllers/employeeController.js";
import { DepartmentController } from "@/src/adapters/controllers/departmentController.js";
import { DesignationController } from "@/src/adapters/controllers/designationController.js";
import { LocationController } from "@/src/adapters/controllers/locationController.js";
import { AttendanceController } from "@/src/adapters/controllers/attendanceController.js";
import { LeaveController } from "@/src/adapters/controllers/leaveController.js";
import { SalaryController } from "@/src/adapters/controllers/salaryController.js";
import { PermissionController } from "@/src/adapters/controllers/permissionController.js";
import { authMiddleware } from "@/src/frameworks/middleware.js";
import { DirectChatController } from "../adapters/controllers/DirectChatController.js";
import { DirectMessageController } from "../adapters/controllers/DirectMessageController.js";
import { GroupChatController } from "../adapters/controllers/GroupChatController.js";
import { GroupMemberController } from "../adapters/controllers/GroupMemberController.js";
import { GroupMessageController } from "../adapters/controllers/GroupMessageController.js";

const router : Router =Router();

const userController=new UserController();
const employeeController=new EmployeeController();
const departmentController=new DepartmentController();
const designationController=new DesignationController();
const locationController=new LocationController();
const attendanceController=new AttendanceController();
const leaveController=new LeaveController();
const salaryController=new SalaryController();
const permissionController=new PermissionController();

const directChatController = new DirectChatController();
const directMessageController = new DirectMessageController();
const groupChatController = new GroupChatController();
const groupMemberController = new GroupMemberController();
const groupMessageController = new GroupMessageController();

router.use("/users",userController.router);
router.use("/employees",authMiddleware,employeeController.router);
router.use("/departments",authMiddleware,departmentController.router);
router.use("/designations",authMiddleware,designationController.router);
router.use("/locations",authMiddleware,locationController.router);
router.use("/attendance",authMiddleware,attendanceController.router);
router.use("/leaves",authMiddleware,leaveController.router);
router.use("/salaries",authMiddleware,salaryController.router);
router.use("/permissions",authMiddleware,permissionController.router);

router.use("/chat/direct", directChatController.router);
router.use("/chat/direct-message", directMessageController.router);
router.use("/chat/group",  groupChatController.router);
router.use("/chat/group-member", groupMemberController.router);
router.use("/chat/group-message", groupMessageController.router);
export default router;