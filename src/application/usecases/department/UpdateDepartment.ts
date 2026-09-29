import type { IDepartmentRepository } from "@/src/application/interfaces/IDepartmentRepository.js";

export class UpdateDepartment {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute(
        id: string,
        data: any
    ) {
        return await this.repository.update(id, data);
    }
}