import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";
import { config } from "@/src/config/index.js";

export class LoginEmployee {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(
        email: string,
        password: string
    ) {
        const employee =
            await this.repository.findByEmail(email);

        if (!employee) {
            throw new Error("Invalid email or password");
        }

        if (!employee.emailVerified) {
            throw new Error("Please verify your email first");
        }

        const isMatch =
            await bcrypt.compare(
                password,
                employee.password
            );

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                employeeId: employee.id,
                role: employee.role,
                organizationId: employee.organization?.orgId
            },
            config.jwtSecret,
            { expiresIn: "1d" }
        );

        return {
            message: "Login successful",
            token,
            mustChangePassword: employee.mustChangePassword
        };
    }
}