import {
    LeaveType
} from "@/src/application/domain/enum.js";

import type {
    ILeaveRepository
} from "@/src/application/interfaces/ILeaveRepository.js";

import {
    AppError,
    StatusCode
} from "../../../shared/error.js";


export class GetLeaveBalance {

    constructor(
        private leaveRepository:
            ILeaveRepository
    ) {}


    async execute(
        employeeId: string
    ) {

        if (!employeeId) {

            throw new AppError(
                "Employee ID is required",
                StatusCode.BadRequest
            );
        }


        const casualTaken =
            await this.leaveRepository
                .getApprovedLeaveDays(
                    employeeId,
                    LeaveType.CASUAL
                );


        const sickTaken =
            await this.leaveRepository
                .getApprovedLeaveDays(
                    employeeId,
                    LeaveType.SICK
                );


        const casualTotal = 1;

        const sickTotal = 1;


        const casualAvailable =
            Math.max(
                casualTotal - casualTaken,
                0
            );


        const sickAvailable =
            Math.max(
                sickTotal - sickTaken,
                0
            );


        return {

            casualLeave: {

                code: "CL",

                total: casualTotal,

                taken: casualTaken,

                available:
                    casualAvailable
            },


            sickLeave: {

                code: "SL",

                total: sickTotal,

                taken: sickTaken,

                available:
                    sickAvailable
            }
        };
    }
}