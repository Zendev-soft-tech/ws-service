import type { IEmployeeRepository }
    from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployeeByNumber {

    constructor(
        private repository: IEmployeeRepository
    ) {}


    async execute(
        employeeNumber: string
    ) {

        return await this.repository.findByNumber(
            employeeNumber
        );
    }
}