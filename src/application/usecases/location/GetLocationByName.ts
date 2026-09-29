import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class GetLocationByName {
    constructor(private repository: ILocationRepository) {}

    async execute(name: string) {
        return await this.repository.findByName(name);
    }
}