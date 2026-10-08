import bcrypt from "bcrypt";

import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";
import { UserRole } from "@/src/application/domain/enum.js";
import { sendEmail } from "@/src/infrastructure/emailService.js";

export class RegisterFirstAdmin {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(
        fullName: string,
        email: string,
        password: string
    ) {
        const employees = await this.repository.findAll();

        if (employees.length > 0) {
            throw new Error("Admin registration is already completed");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        const employee = await this.repository.create({
            fullName,
            email,
            password: hashedPassword,
            role: UserRole.ADMIN,
            mustChangePassword: false,
            registrationOtp: otp,
            registrationOtpExpiry: otpExpiry,
            emailVerified: false
        });

        await sendEmail(
            email,
            "HRMS Admin Registration OTP",
            `Hello ${fullName},

Your HRMS registration OTP is:

${otp}

This OTP will expire in 5 minutes.

Regards,
HRMS Team`
        );

        return {
            message: "OTP sent to email",
            employeeId: employee.id
        };
    }
}