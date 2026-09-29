import type { IDesignationRepository }
    from "@/src/application/interfaces/IDesignationRepository.js";

export class GetDesignationsByDepartment {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(
        departmentId: string
    ) {

        return await this.repository
            .findByDepartment(departmentId);
    }
}