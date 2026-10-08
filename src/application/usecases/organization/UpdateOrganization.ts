import type { IOrganizationRepository } from "@/src/application/interfaces/IOrganizationRepository.js";

export class UpdateOrganization{
    constructor (private organizationRepository:IOrganizationRepository){}
    async execute(id:string,data:any){
        return await this.organizationRepository.update(id,data);
    }
}