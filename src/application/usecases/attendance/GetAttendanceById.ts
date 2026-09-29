import type { IAttendanceRepository }
    from "@/src/application/interfaces/IAttendanceRepository.js";

export class GetAttendanceById {

    constructor(
        private repository: IAttendanceRepository
    ) {}

    async execute(id: string) {

        return await this.repository.findById(id);
    }
}