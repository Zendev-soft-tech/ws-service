import type { ISalaryRepository } from "@/src/application/interfaces/ISalaryRepository.js";

export class GetSalary {
    constructor(private repository: ISalaryRepository) {}

    async execute(employeeId: string) {
        return await this.repository.findByEmployee(employeeId);
    }
}