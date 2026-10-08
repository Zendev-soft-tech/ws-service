import type { IOrganizationRepository } from "@/src/application/interfaces/IOrganizationRepository.js";

export class GetOrganizationById{
    constructor (private oraganizationRepository:IOrganizationRepository){}
    async execute(id:string){
        return await this.oraganizationRepository.findById(id);
    }
}