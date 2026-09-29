import type { IAttendanceRepository } from "@/src/application/interfaces/IAttendanceRepository.js";


export class GetAttendance {

    constructor(
        private repository: IAttendanceRepository
    ) {}


    async execute() {

        return await this.repository.findAll();
    }
}