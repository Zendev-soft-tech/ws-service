import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class UpdateLocation {

    constructor(
        private repository: ILocationRepository
    ) {}

    async execute(
        id: string,
        data: any
    ) {
        return await this.repository.update(id, data);
    }
}