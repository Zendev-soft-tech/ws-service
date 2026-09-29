import type { IDepartmentRepository } from "@/src/application/interfaces/IDepartmentRepository.js";

export class GetDepartments {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute() {
        return await this.repository.findAll();
    }
}