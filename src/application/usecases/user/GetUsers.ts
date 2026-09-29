import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class GetUsers {
    constructor(private repository: IUserRepository) {}

    async execute() {
        return await this.repository.findAll();
    }
}