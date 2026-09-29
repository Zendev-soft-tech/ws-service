import type { IAttendanceRepository } from "@/src/application/interfaces/IAttendanceRepository.js";


export class GetEmployeeAttendance {

    constructor(
        private repository: IAttendanceRepository
    ) {}


    async execute(
        employeeId: string
    ) {

        return await this.repository
            .findByEmployee(employeeId);
    }
}