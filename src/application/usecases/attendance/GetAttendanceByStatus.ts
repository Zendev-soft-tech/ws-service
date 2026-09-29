import type { IAttendanceRepository }
    from "@/src/application/interfaces/IAttendanceRepository.js";

export class GetAttendanceByStatus {

    constructor(
        private repository: IAttendanceRepository
    ) {}

    async execute(status: string) {

        return await this.repository
            .findByStatus(status);
    }
}