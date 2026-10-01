import {Router, type Router as ExpressRouter} from "express";


import * as userController from "@/src/adapters/controllers/userController.js";
import * as employeeController from "@/src/adapters/controllers/employeeController.js";
import * as departmentController from "@/src/adapters/controllers/departmentController.js";
import * as designationController from "@/src/adapters/controllers/designationController.js";
import * as locationController from "@/src/adapters/controllers/locationController.js";
import * as attendanceController from "@/src/adapters/controllers/attendanceController.js";
import * as leaveController from "@/src/adapters/controllers/leaveController.js";
import * as salaryController from "@/src/adapters/controllers/salaryController.js";

import { DirectChatRepository } from "@/src/adapters/repositories/DirectChatRepository.js";
import { DirectMessageRepository } from "@/src/adapters/repositories/DirectMessageRepository.js";
import { GroupChatRepository } from "@/src/adapters/repositories/GroupChatRepository.js";
import { GroupMemberRepository } from "@/src/adapters/repositories/GroupMemberRepository.js";
import { GroupMessageRepository } from "@/src/adapters/repositories/GroupMessageRepository.js";

import { DirectChatController } from "@/src/adapters/controllers/DirectChatController.js";
import { DirectMessageController } from "@/src/adapters/controllers/DirectMessageController.js";
import { GroupChatController } from "@/src/adapters/controllers/GroupChatController.js";
import { GroupMemberController } from "@/src/adapters/controllers/GroupMemberController.js";
import { GroupMessageController } from "@/src/adapters/controllers/GroupMessageController.js";

import {authMiddleware, hrAdminMiddleware} from "@/src/frameworks/middleware.js";

const router: ExpressRouter = Router();

/* =========================
   USER
========================= */

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get(
  "/users",
  authMiddleware,
  userController.getAll
);

router.get(
  "/users/:id",
  authMiddleware,
  userController.getById
);

router.get(
  "/users/email/:email",
  authMiddleware,
  userController.getByEmail
);

router.put(
  "/users/:id",
  authMiddleware,
  userController.update
);

router.delete(
  "/users/:id",
  authMiddleware,
  userController.remove
);

/* =========================
   EMPLOYEE
========================= */

router.post(
  "/employees",
  authMiddleware,
  employeeController.create
);

router.get(
  "/employees",
  authMiddleware,
  employeeController.getAll
);

router.get(
  "/employees/:id",
  authMiddleware,
  employeeController.getOne
);

router.get(
  "/employees/email/:email",
  authMiddleware,
  employeeController.getByEmail
);

router.get(
  "/employees/number/:employeeNumber",
  authMiddleware,
  employeeController.getByNumber
);

router.get(
  "/employees/department/:departmentId",
  authMiddleware,
  employeeController.getByDepartment
);

router.get(
  "/employees/designation/:designationId",
  authMiddleware,
  employeeController.getByDesignation
);

router.get(
  "/employees/location/:locationId",
  authMiddleware,
  employeeController.getByLocation
);

router.put(
  "/employees/:id",
  authMiddleware,
  employeeController.update
);

router.delete(
  "/employees/:id",
  authMiddleware,
  employeeController.remove
);

/* =========================
   DEPARTMENT
========================= */

router.post(
  "/departments",
  authMiddleware,
  departmentController.create
);

router.get(
  "/departments",
  authMiddleware,
  departmentController.getAll
);

router.get(
  "/departments/:id",
  authMiddleware,
  departmentController.getById
);

router.get(
  "/departments/code/:code",
  authMiddleware,
  departmentController.getByCode
);

router.get(
  "/departments/name/:name",
  authMiddleware,
  departmentController.getByName
);

router.put(
  "/departments/:id",
  authMiddleware,
  departmentController.updateDepartment
);

router.delete(
  "/departments/:id",
  authMiddleware,
  departmentController.removeDepartment
);

/* =========================
   DESIGNATION
========================= */

router.post(
  "/designations",
  authMiddleware,
  designationController.create
);

router.get(
  "/designations",
  authMiddleware,
  designationController.getAll
);

router.get(
  "/designations/:id",
  authMiddleware,
  designationController.getById
);

router.get(
  "/designations/code/:code",
  authMiddleware,
  designationController.getByCode
);

router.get(
  "/designations/name/:name",
  authMiddleware,
  designationController.getByName
);

router.get(
  "/designations/department/:departmentId",
  authMiddleware,
  designationController.getByDepartment
);

router.put(
  "/designations/:id",
  authMiddleware,
  designationController.updateDesignation
);

router.delete(
  "/designations/:id",
  authMiddleware,
  designationController.removeDesignation
);

/* =========================
   LOCATION
========================= */

router.post(
  "/locations",
  authMiddleware,
  locationController.create
);

router.get(
  "/locations",
  authMiddleware,
  locationController.getAll
);

router.get(
  "/locations/:id",
  authMiddleware,
  locationController.getById
);

router.get(
  "/locations/code/:code",
  authMiddleware,
  locationController.getByCode
);

router.get(
  "/locations/name/:name",
  authMiddleware,
  locationController.getByName
);

router.get(
  "/locations/city/:city",
  authMiddleware,
  locationController.getByCity
);

router.put(
  "/locations/:id",
  authMiddleware,
  locationController.updateLocation
);

router.delete(
  "/locations/:id",
  authMiddleware,
  locationController.removeLocation
);

/* =========================
   ATTENDANCE
========================= */

router.post(
  "/attendance/check-in",
  authMiddleware,
  attendanceController.checkInEmployee
);

router.post(
  "/attendance/check-out",
  authMiddleware,
  attendanceController.checkOutEmployee
);

router.get(
  "/attendance",
  authMiddleware,
  attendanceController.getAll
);

router.get(
  "/attendance/employee/:employeeId",
  authMiddleware,
  attendanceController.getByEmployee
);

/* =========================
   LEAVE
========================= */

router.post(
  "/leaves",
  authMiddleware,
  leaveController.applyLeaveController
);

router.get(
  "/leaves",
  authMiddleware,
  leaveController.getLeavesController
);

router.get(
  "/leaves/:id",
  authMiddleware,
  leaveController.getLeaveByIdController
);

router.get(
  "/leaves/employee/:employeeId",
  authMiddleware,
  leaveController.getLeavesByEmployeeController
);

router.get(
  "/leaves/status/:status",
  authMiddleware,
  leaveController.getLeavesByStatusController
);

router.get(
  "/leaves/balance/:employeeId",
  authMiddleware,
  leaveController.getLeaveBalanceController
);

router.patch(
  "/leaves/:id/approve",
  authMiddleware,
  hrAdminMiddleware,
  leaveController.approveLeaveController
);

router.patch(
  "/leaves/:id/reject",
  authMiddleware,
  hrAdminMiddleware,
  leaveController.rejectLeaveController
);

/* =========================
   SALARY
========================= */

router.post(
  "/salaries",
  authMiddleware,
  salaryController.create
);

router.get(
  "/salaries/:employeeId",
  authMiddleware,
  salaryController.getSalary
);

router.put(
  "/salaries/:employeeId",
  authMiddleware,
  salaryController.updateSalary
);

router.delete(
  "/salaries/:employeeId",
  authMiddleware,
  salaryController.deleteSalary
);

/* =========================================================
   CHAT - REPOSITORIES
========================================================= */

const directChatRepository =
  new DirectChatRepository();

const directMessageRepository =
  new DirectMessageRepository();

const groupChatRepository =
  new GroupChatRepository();

const groupMemberRepository =
  new GroupMemberRepository();

const groupMessageRepository =
  new GroupMessageRepository();

/* =========================================================
   CHAT - DIRECT USE CASES
========================================================= */

// const createDirectChat =
//   \\new CreateDirectChat(
//     directChatRepository
//   );

// const getDirectChats =
//   new GetDirectChats(
//     directChatRepository
//   );

// const getDirectChatById =
//   new GetDirectChatById(
//     directChatRepository
//   );

// const sendDirectMessage =
//   new SendDirectMessage(
//     directMessageRepository,
//     directChatRepository
//   );

// const getDirectMessages =
//   new GetDirectMessages(
//     directMessageRepository,
//     directChatRepository
//   );

// const updateDirectMessage =
//   new UpdateDirectMessage(
//     directMessageRepository,
//     directChatRepository
//   );

// const deleteDirectMessage =
//   new DeleteDirectMessage(
//     directMessageRepository
//   );

/* =========================================================
   CHAT - GROUP USE CASES
========================================================= */

// const createGroup =
//   new CreateGroup(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const getGroups =
//   new GetGroups(
//     groupChatRepository
//   );

// const getGroupById =
//   new GetGroupById(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const updateGroup =
//   new UpdateGroup(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const deleteGroup =
//   new DeleteGroup(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const addGroupMember =
//   new AddGroupMember(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const getGroupMembers =
//   new GetGroupMembers(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const updateGroupMemberRole =
//   new UpdateGroupMemberRole(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const removeGroupMember =
//   new RemoveGroupMember(
//     groupChatRepository,
//     groupMemberRepository
//   );

// const sendGroupMessage =
//   new SendGroupMessage(
//     groupChatRepository,
//     groupMemberRepository,
//     groupMessageRepository
//   );

// const getGroupMessages =
//   new GetGroupMessages(
//     groupChatRepository,
//     groupMemberRepository,
//     groupMessageRepository
//   );

// const updateGroupMessage =
//   new UpdateGroupMessage(
//     groupChatRepository,
//     groupMemberRepository,
//     groupMessageRepository
//   );

// const deleteGroupMessage =
//   new DeleteGroupMessage(
//     groupMessageRepository
//   );

/* =========================================================
   CHAT - CONTROLLERS
========================================================= */

// const directChatController =
//   new DirectChatController(
//     createDirectChat,
//     getDirectChats,
//     getDirectChatById
//   );

// const directMessageController =
//   new DirectMessageController(
//     sendDirectMessage,
//     getDirectMessages,
//     updateDirectMessage,
//     deleteDirectMessage
//   );

// const groupChatController =
//   new GroupChatController(
//     createGroup,
//     getGroups,
//     getGroupById,
//     updateGroup,
//     deleteGroup
//   );

// const groupMemberController =
//   new GroupMemberController(
//     addGroupMember,
//     getGroupMembers,
//     updateGroupMemberRole,
//     removeGroupMember
//   );

// const groupMessageController =
//   new GroupMessageController(
//     sendGroupMessage,
//     getGroupMessages,
//     updateGroupMessage,
//     deleteGroupMessage
//   );
const directChatController = new DirectChatController();

const directMessageController = new DirectMessageController();

const groupChatController = new GroupChatController();

const groupMemberController = new GroupMemberController();

const groupMessageController = new GroupMessageController();

router.use(
    "/chat/direct",
    directChatController.router
);

router.use(
    "/chat/direct-message",
    directMessageController.router
);

router.use(
    "/chat/group",
    groupChatController.router
);

router.use(
    "/chat/group-member",
    groupMemberController.router
);

router.use(
    "/chat/group-message",
    groupMessageController.router
);


export default router;