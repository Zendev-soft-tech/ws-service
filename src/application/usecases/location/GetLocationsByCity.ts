import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class GetLocationsByCity {
    constructor(private repository: ILocationRepository) {}

    async execute(city: string) {
        return await this.repository.findByCity(city);
    }
}