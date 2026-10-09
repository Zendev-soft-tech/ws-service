import type { IOrganizationRepository } from "../../interfaces/IOrganizationRepository.js";

export class GetOrganizations{
    constructor (private organizationRepository:IOrganizationRepository){}
    async execute(){
        return await this.organizationRepository.findAll();
    }
}