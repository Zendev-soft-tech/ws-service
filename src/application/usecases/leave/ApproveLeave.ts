import {
    LeaveStatus
} from "@/src/application/domain/enum.js";

import type {
    ILeaveRepository
} from "@/src/application/interfaces/ILeaveRepository.js";


export class ApproveLeave {

    constructor(
        private leaveRepository:
            ILeaveRepository
    ) {}


    async execute(
        id: string
    ) {

        if (!id) {

            throw new Error(
                "Leave ID is required"
            );
        }


        const leave =
            await this.leaveRepository
                .findById(id);


        if (!leave) {

            throw new Error(
                "Leave not found"
            );
        }


        if (
            leave.status !==
            LeaveStatus.PENDING
        ) {

            throw new Error(
                "Only pending leave can be approved"
            );
        }


        return await this.leaveRepository
            .update(id, {

                status:
                    LeaveStatus.APPROVED,

                rejectionReason:
                    null
            });
    }
}