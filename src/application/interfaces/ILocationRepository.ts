import type { Location } from "@/src/adapters/models/Location.js";

export interface ILocationRepository {
    create(data: Partial<Location>): Promise<Location>;
    update(id: string, data: Partial<Location>): Promise<Location>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Location[]>;
    findById(id: string): Promise<Location | null>;
    findByCode(code: string): Promise<Location | null>;
    findByName(name: string): Promise<Location | null>;
    findByCity(city: string): Promise<Location[]>;
}