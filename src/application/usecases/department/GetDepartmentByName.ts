import type { IDepartmentRepository }
    from "@/src/application/interfaces/IDepartmentRepository.js";

export class GetDepartmentByName {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute(name: string) {

        return await this.repository.findByName(name);
    }
}