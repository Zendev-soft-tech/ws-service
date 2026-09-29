import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class GetUserById {
    constructor(private repository: IUserRepository) {}

    async execute(id: string) {
        return await this.repository.findById(id);
    }
}