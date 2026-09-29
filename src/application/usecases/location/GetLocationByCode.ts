import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class GetLocationByCode {
    constructor(private repository: ILocationRepository) {}

    async execute(code: string) {
        return await this.repository.findByCode(code);
    }
}