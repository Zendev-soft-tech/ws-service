import type { IEmployeeRepository }
    from "@/src/application/interfaces/IEmployeeRepository.js";


export class GetEmployeeByEmail {

    constructor(
        private repository: IEmployeeRepository
    ) {}


    async execute(
        email: string
    ) {

        return await this.repository.findByEmail(email);
    }
}