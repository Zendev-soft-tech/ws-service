import type { Employee } from "@/src/adapters/models/Employee.js";
import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class UpdateEmployee {
    constructor(
        private employeeRepository: IEmployeeRepository
    ) {}

    async execute(
        id: string,
        data: Partial<Employee>
    ) {
        return await this.employeeRepository.update(
            id,
            data
        );
    }
}