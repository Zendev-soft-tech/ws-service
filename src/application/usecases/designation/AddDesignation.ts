import type { IDesignationRepository } from "@/src/application/interfaces/IDesignationRepository.js";

export class AddDesignation {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(data: any) {
        return await this.repository.create(data);
    }
}