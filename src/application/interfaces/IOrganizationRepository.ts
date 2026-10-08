import type{ Organization } from "@/src/adapters/models/Organization.js";

export interface IOrganizationRepository{
    create(data:Partial<Organization>):Promise<Organization>;
    findAll():Promise<Organization[]>;
    findById(id:string):Promise<Organization|null>;
    findByName(name:string):Promise<Organization|null>;
    update(id:string,data:Partial<Organization>):Promise<Organization>;
    delete(id:string):Promise<void>;
}