import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class DeleteLocation {

    constructor(
        private repository: ILocationRepository
    ) {}

    async execute(id: string) {

        await this.repository.delete(id);

        return {
            message: "Location deleted successfully"
        };
    }
}