import type { IDesignationRepository }
    from "@/src/application/interfaces/IDesignationRepository.js";

export class GetDesignationByCode {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute(code: string) {

        return await this.repository.findByCode(code);
    }
}