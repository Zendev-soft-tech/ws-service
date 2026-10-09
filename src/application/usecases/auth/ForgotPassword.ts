import crypto from "crypto";

import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";
import { sendEmail } from "@/src/infrastructure/emailService.js";

export class ForgotPassword {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(email: string) {
        const employee =
            await this.repository.findByEmail(email);

        if (!employee) {
            throw new Error("Employee not found");
        }

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        const resetExpiry =
            new Date(Date.now() + 15 * 60 * 1000);

        await this.repository.update(employee.id, {
            resetPasswordToken: resetToken,
            resetPasswordExpiry: resetExpiry
        });

        await sendEmail(
            email,
            "HRMS Password Reset",
            `Hello ${employee.fullName},

Use the following token to reset your HRMS password:

${resetToken}

This token will expire in 15 minutes.

Regards,
HRMS Team`
        );

        return {
            message: "Password reset link sent to your email"
        };
    }
}