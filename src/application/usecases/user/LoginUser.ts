import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserRepository } from "@/src/application/interfaces/IUserRepository.js";
import type { IEmployeeRepository } from "@/src/application/interfaces/IEmployeeRepository.js";
import { config } from "@/src/config/index.js";


export class LoginUser {
    constructor(
        private userRepository: IUserRepository,
        private employeeRepository: IEmployeeRepository
    ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const employee = await this.employeeRepository.findByEmail(email);
        if(!employee){throw new Error("Employee Profile not found");}
        const userRole=employee.userRole;

        const token = jwt.sign(
            {
                userId: user.id,
                employeeId:employee.id,
                userRole
            },
            config.jwtSecret,
            { expiresIn: "1d" }
        );

        return {
            message: "Login successful",
            token
        };
    }
}