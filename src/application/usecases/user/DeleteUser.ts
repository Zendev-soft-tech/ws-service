import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class DeleteUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string) {
        await this.userRepository.delete(id);
        return {
            message: "User deleted successfully"
        };
    }
}