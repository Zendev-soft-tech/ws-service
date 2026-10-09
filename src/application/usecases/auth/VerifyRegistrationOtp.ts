import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";

export class VerifyRegistrationOtp {

    constructor(
        private repository: IEmployeeRepository
    ) {}

    async execute(
        employeeId: string,
        otp: string
    ) {
        const employee =
            await this.repository.findById(employeeId);

        if (!employee) {
            throw new Error("Employee not found");
        }

        if (!employee.registrationOtp) {
            throw new Error("OTP not found");
        }

        if (
            !employee.registrationOtpExpiry ||
            employee.registrationOtpExpiry < new Date()
        ) {
            throw new Error("OTP expired");
        }

        if (employee.registrationOtp !== otp) {
            throw new Error("Invalid OTP");
        }

        await this.repository.update(employeeId, {
            emailVerified: true,
            registrationOtp: null,
            registrationOtpExpiry: null
        });

        return {
            message: "Email verified successfully"
        };
    }
}