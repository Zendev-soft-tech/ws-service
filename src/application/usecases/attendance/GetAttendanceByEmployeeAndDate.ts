import type { IAttendanceRepository }
    from "@/src/application/interfaces/IAttendanceRepository.js";

export class GetAttendanceByEmployeeAndDate {

    constructor(
        private repository: IAttendanceRepository
    ) {}

    async execute(
        employeeId: string,
        date: string
    ) {

        return await this.repository
            .findByEmployeeAndDate(
                employeeId,
                date
            );
    }
}