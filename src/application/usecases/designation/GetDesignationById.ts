import type { IDesignationRepository }
    from "@/src/application/interfaces/IDesignationRepository.js";

export class GetDesignationById {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(id: string) {

        return await this.repository.findById(id);
    }
}