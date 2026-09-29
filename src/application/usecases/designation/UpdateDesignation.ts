import type { IDesignationRepository } from "@/src/application/interfaces/IDesignationRepository.js";

export class UpdateDesignation {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(
        id: string,
        data: any
    ) {
        return await this.repository.update(id, data);
    }
}