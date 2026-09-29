import type { ILeaveRepository }
    from "@/src/application/interfaces/ILeaveRepository.js";


export class GetLeavesByStatus {

    constructor(
        private repository: ILeaveRepository
    ) {}


    async execute(
        status: string
    ) {

        return await this.repository.findByStatus(
            status
        );
    }
}