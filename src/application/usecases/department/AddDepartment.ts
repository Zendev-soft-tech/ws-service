import type { IDepartmentRepository } from "@/src/application/interfaces/IDepartmentRepository.js";

export class AddDepartment {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute(data: any) {
        return await this.repository.create(data);
    }
}