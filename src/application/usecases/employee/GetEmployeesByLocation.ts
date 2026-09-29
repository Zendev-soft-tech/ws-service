import type { IEmployeeRepository }
    from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployeesByLocation {

    constructor(
        private repository: IEmployeeRepository
    ) {}


    async execute(
        locationId: string
    ) {

        return await this.repository.findByLocation(
            locationId
        );
    }
}