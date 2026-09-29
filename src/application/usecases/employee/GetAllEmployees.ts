import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployees {

    constructor(
        private employeeRepository: IEmployeeRepository
    ) {}


    async execute() {

        return await this.employeeRepository.findAll();
    }
}