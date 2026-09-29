import type {
    ILeaveRepository
} from "@/src/application/interfaces/ILeaveRepository.js";


export class GetLeaves {

    constructor(
        private leaveRepository:
            ILeaveRepository
    ) {}


    async execute() {

        return await this.leaveRepository
            .findAll();
    }
}