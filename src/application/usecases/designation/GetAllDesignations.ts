import type {IDesignationRepository} from "@/src/application/interfaces/IDesignationRepository.js";


export class GetDesignations {

    constructor(
        private repository: IDesignationRepository
    ) {}

    async execute() {
        return await this.repository.findAll();
    }
}