import type { IOrganizationRepository } from "@/src/application/interfaces/IOrganizationRepository.js";

export class AddOrganization{
    constructor(private organizationRepository:IOrganizationRepository){}
    async execute(data:any){
        if(!data){
            throw new Error("Organization data is required");
        }
        return await this.organizationRepository.create(data);
    }
}