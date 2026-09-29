import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class AddLocation {

    constructor(
        private repository: ILocationRepository
    ) {}

    async execute(data: any) {
        return await this.repository.create(data);
    }
}