import bcrypt from "bcrypt";

import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class ResetPassword {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(
        token: string,
        newPassword: string
    ) {
        const employee =
            await this.repository.findByResetToken(token);

        if (!employee) {
            throw new Error("Invalid reset token");
        }

        if (
            !employee.resetPasswordExpiry ||
            employee.resetPasswordExpiry < new Date()
        ) {
            throw new Error("Reset token expired");
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        await this.repository.update(employee.id, {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpiry: null,
            mustChangePassword: false
        });

        return {
            message: "Password reset successfully"
        };
    }
}