import type { IOrganizationRepository } from "@/src/application/interfaces/IOrganizationRepository.js";

export class DeleteOrganization{
    constructor (private organizationRepository:IOrganizationRepository){}
    async execute(id:string){
        await this.organizationRepository.delete(id);
        return{message:"Organization deleted successfully"};
    }
}