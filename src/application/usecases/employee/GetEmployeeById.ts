import type { IEmployeeRepository }
    from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployeeById {

    constructor(
        private repository: IEmployeeRepository
    ) {}


    async execute(
        id: string
    ) {

        return await this.repository.findById(id);
    }
}