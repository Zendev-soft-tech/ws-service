import type { IDesignationRepository } from "@/src/application/interfaces/IDesignationRepository.js";

export class DeleteDesignation {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(id: string) {

        await this.repository.delete(id);

        return {
            message: "Designation deleted successfully"
        };
    }
}