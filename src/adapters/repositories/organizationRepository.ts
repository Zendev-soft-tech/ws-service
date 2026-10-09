import { AppDataSource } from "@/src/infrastructure/database.js";
import { Organization } from "@/src/adapters/models/Organization.js";
import type { IOrganizationRepository } from "@/src/application/interfaces/IOrganizationRepository.js";


export class OrganizationRepository implements IOrganizationRepository{
    private repository=AppDataSource.getRepository(Organization);

    async create(data: Partial<Organization>): Promise<Organization> {
        const organization=this.repository.create(data);
        return await this.repository.save(organization);
    }
    async findAll(): Promise<Organization[]> {
        return await this.repository.find();
    }
    async findById(id: string): Promise<Organization | null> {
        return await this.repository.findOne({where:{orgId:id}});
    }
    async findByName(name: string): Promise<Organization | null> {
        return await this.repository.findOne({where:{name}});
    }
    async update(id: string, data: Partial<Organization>): Promise<Organization> {
        const organization=await this.repository.preload({orgId:id,...data});
        if(!organization){
            throw new Error("Organization not found");
        }
        return await this.repository.save(organization);
    }
    async delete(id: string): Promise<void> {
        const result=await this.repository.delete(id);
        if(result.affected===0){
            throw new Error("Organization not found");
        }
    }

}