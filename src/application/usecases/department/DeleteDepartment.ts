import type { IDepartmentRepository } from "@/src/application/interfaces/IDepartmentRepository.js";

export class DeleteDepartment {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute(id: string) {

        await this.repository.delete(id);

        return {
            message: "Department deleted successfully"
        };
    }
}