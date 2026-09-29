import { AppDataSource } from "@/src/infrastructure/database.js";
import { Location } from "@/src/adapters/models/Location.js";
import type { ILocationRepository } from "@/src/application/interfaces/ILocationRepository.js";

export class LocationRepository implements ILocationRepository {
    private repository = AppDataSource.getRepository(Location);

    async create(data: Partial<Location>): Promise<Location> {
        const location = this.repository.create(data);
        return await this.repository.save(location);
    }

    async findAll(): Promise<Location[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<Location | null> {
        return await this.repository.findOne({
            where: { id },

        });
    }

    async findByCode(code: string): Promise<Location | null> {
        return await this.repository.findOne({
            where: { code }
        });
    }

    async findByName(name: string): Promise<Location | null> {
        return await this.repository.findOne({
            where: { name }
            
        });
    }

    async findByCity(city: string): Promise<Location[]> {
        return await this.repository.find({
            where: { city }
            
        });
    }

    async update(id: string, data: Partial<Location>): Promise<Location> {
        await this.repository.update(id, data);

        const location = await this.findById(id);

        if (!location) {
            throw new Error("Location not found");
        }

        return location;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}