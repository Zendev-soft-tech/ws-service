import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class DeleteEmployee {

    constructor(
        private employeeRepository: IEmployeeRepository
    ) {}

    async execute(id: string) {

        const employee =
            await this.employeeRepository.findById(id);

        if (!employee) {
            throw new Error("Employee not found");
        }

        await this.employeeRepository.delete(id);

        return {
            message: "Employee deleted successfully"
        };
    }
}