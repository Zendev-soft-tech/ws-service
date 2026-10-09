import bcrypt from "bcrypt";

import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";
import { sendEmail } from "@/src/infrastructure/emailService.js";

export class AddEmployee {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(data: any) {

        if (!data) {
            throw new Error("Employee data is required");
        }

        const existingEmployee =
            await this.repository.findByEmail(data.email);

        if (existingEmployee) {
            throw new Error("Email already registered");
        }

        let employeeNumber =
            data.employeeNumber?.trim();

        if (!employeeNumber) {
            employeeNumber =
                await this.repository.generateEmployeeNumber();
        }

        const temporaryPassword =
            Math.random()
                .toString(36)
                .slice(-8);

        const hashedPassword =
            await bcrypt.hash(temporaryPassword, 10);

        const employee =
            await this.repository.create({
                ...data,
                password: hashedPassword,
                employeeNumber,
                mustChangePassword: true,
                emailVerified: true
            });

        await sendEmail(
            data.email,
            "HRMS Account Created",
            `Hello ${data.fullName},

Your HRMS account has been created.

Email: ${data.email}
Temporary Password: ${temporaryPassword}

Please login using these credentials and change your password.

Regards,
HRMS Team`
        );

        return {
            message: "Employee created successfully",
            employeeId: employee.id
        };
    }
}