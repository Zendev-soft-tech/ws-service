import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class GetEmployeesByOrganization {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(organizationId: string) {
        return await this.repository.findByOrganization(organizationId);
    }
}