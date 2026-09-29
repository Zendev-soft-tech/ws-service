import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class GetUserByEmail {
    constructor(private repository: IUserRepository) {}

    async execute(email: string) {
        return await this.repository.findByEmail(email);
    }
}