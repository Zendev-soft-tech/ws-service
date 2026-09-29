import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class UpdateUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(
        id: string,
        data: Partial<{ email: string; password: string }>
    ) {
        return await this.userRepository.update(id, data);
    }
}