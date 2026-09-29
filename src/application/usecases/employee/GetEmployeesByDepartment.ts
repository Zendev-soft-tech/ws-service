import type { IEmployeeRepository }
    from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployeesByDepartment {

    constructor(
        private repository: IEmployeeRepository
    ) {}


    async execute(
        departmentId: string
    ) {

        return await this.repository.findByDepartment(
            departmentId
        );
    }
}