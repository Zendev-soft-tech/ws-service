import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class GetLocationById {
    constructor(private repository: ILocationRepository) {}

    async execute(id: string) {
        return await this.repository.findById(id);
    }
}