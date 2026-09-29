import type { IDesignationRepository }
    from "@/src/application/interfaces/IDesignationRepository.js";

export class GetDesignationByName {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(name: string) {

        return await this.repository.findByName(name);
    }
}