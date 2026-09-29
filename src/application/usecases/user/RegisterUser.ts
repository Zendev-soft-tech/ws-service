import bcrypt from "bcrypt";
import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class RegisterUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string) {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await this.userRepository.create({
            email,
            password: hashedPassword
        });
    }
}