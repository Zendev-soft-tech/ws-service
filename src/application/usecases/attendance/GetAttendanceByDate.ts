import type { IAttendanceRepository }
    from "@/src/application/interfaces/IAttendanceRepository.js";

export class GetAttendanceByDate {

    constructor(
        private repository: IAttendanceRepository
    ) {}

    async execute(date: string) {

        return await this.repository
            .findByDate(date);
    }
}