import type { IEmployeeRepository }
    from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployeesByDesignation {

    constructor(
        private repository: IEmployeeRepository
    ) {}


    async execute(
        designationId: string
    ) {

        return await this.repository.findByDesignation(
            designationId
        );
    }
}