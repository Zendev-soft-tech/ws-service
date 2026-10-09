import bcrypt from "bcrypt";

import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class ChangePassword {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(
        employeeId: string,
        currentPassword: string,
        newPassword: string
    ) {
        const employee =
            await this.repository.findById(employeeId);

        if (!employee) {
            throw new Error("Employee not found");
        }

        const isMatch =
            await bcrypt.compare(
                currentPassword,
                employee.password
            );

        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }

        if (currentPassword === newPassword) {
            throw new Error(
                "New password must be different from current password"
            );
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        await this.repository.update(employeeId, {
            password: hashedPassword,
            mustChangePassword: false
        });

        return {
            message: "Password changed successfully"
        };
    }
}