import { AppDataSource } from "@/src/infrastructure/database.js";
import { User } from "@/src/adapters/models/User.js";
import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";

export class UserRepository implements IUserRepository {
    private repository = AppDataSource.getRepository(User);

    async create(data: Partial<User>): Promise<User> {
        const user = this.repository.create(data);
        return await this.repository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<User | null> {
        return await this.repository.findOne({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({
            where: { email }
        });
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        await this.repository.update(id, data);
        const user = await this.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}