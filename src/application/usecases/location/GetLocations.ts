import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class GetLocations {

    constructor(
        private repository: ILocationRepository
    ) {}

    async execute() {
        return await this.repository.findAll();
    }
}