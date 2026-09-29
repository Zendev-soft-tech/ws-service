import type { ISalaryRepository } from "@/src/application/interfaces/ISalaryRepository.js";

export class DeleteSalary {
    constructor(private repository: ISalaryRepository) {}

    async execute(employeeId: string) {
        await this.repository.delete(employeeId);

        return {
            message: "Salary deleted successfully"
        };
    }
}