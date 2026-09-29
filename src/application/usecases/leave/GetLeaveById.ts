import type { ILeaveRepository }
    from "@/src/application/interfaces/ILeaveRepository.js";


export class GetLeaveById {

    constructor(
        private repository: ILeaveRepository
    ) {}


    async execute(
        id: string
    ) {

        return await this.repository.findById(id);
    }
}