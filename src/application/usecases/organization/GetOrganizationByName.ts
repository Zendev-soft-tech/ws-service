import type { IOrganizationRepository } from "@/src/application/interfaces/IOrganizationRepository.js";

export class GetOrganizationByName{
    constructor(private organizationRepository:IOrganizationRepository){}
    async execute(name:string){
        return await this.organizationRepository.findByName(name);
    }
}