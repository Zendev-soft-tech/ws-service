import type { IDepartmentRepository }
    from "@/src/application/interfaces/IDepartmentRepository.js";

export class GetDepartmentById {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute(id: string) {

        return await this.repository.findById(id);
    }
}