import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";
import {Employee} from "@/src/adapters/models/Employee.js"

export class AddEmployee {

    constructor(
        private employeeRepository: IEmployeeRepository
    ) {}


    async execute(
        data: any
    ) {
        if (!data) {
            throw new Error("Employee data is required");
        }

        let employeeNumber =
            data.employeeNumber?.trim();


        if (!employeeNumber) {

            employeeNumber =
                await this.employeeRepository
                    .generateEmployeeNumber();
        }


        return await this.employeeRepository.create({
            ...data,
            employeeNumber
        });
    }
}