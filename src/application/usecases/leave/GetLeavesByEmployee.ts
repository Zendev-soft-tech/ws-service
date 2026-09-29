import type { ILeaveRepository }
    from "@/src/application/interfaces/ILeaveRepository.js";


export class GetLeavesByEmployee {

    constructor(
        private repository: ILeaveRepository
    ) {}


    async execute(
        employeeId: string
    ) {

        return await this.repository.findByEmployee(
            employeeId
        );
    }
}