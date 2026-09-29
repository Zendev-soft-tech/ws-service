import type { IDepartmentRepository }
    from "@/src/application/interfaces/IDepartmentRepository.js";

export class GetDepartmentByCode {

    constructor(
        private repository: IDepartmentRepository
    ) {}

    async execute(code: string) {

        return await this.repository.findByCode(code);
    }
}