import { Router, type Request, type Response } from "express";

import { EmployeeRepository } from "@/src/adapters/repositories/employeeRepository.js";

import { RegisterFirstAdmin } from "@/src/application/usecases/auth/RegisterFirstAdmin.js";
import { VerifyRegistrationOtp } from "@/src/application/usecases/auth/VerifyRegistrationOtp.js";
import { LoginEmployee } from "@/src/application/usecases/auth/LoginEmployee.js";
import { ChangePassword } from "@/src/application/usecases/auth/ChangePassword.js";
import { ForgotPassword } from "@/src/application/usecases/auth/ForgotPassword.js";
import { ResetPassword } from "@/src/application/usecases/auth/ResetPassword.js";

import { authMiddleware, type AuthRequest } from "@/src/frameworks/middleware.js";

export class AuthController {

    public router = Router();
    private repository = new EmployeeRepository();

    constructor() {
        this.router.post("/register-admin", this.registerAdmin.bind(this));
        this.router.post("/verify-otp", this.verifyOtp.bind(this));
        this.router.post("/login", this.login.bind(this));
        this.router.post("/change-password", authMiddleware, this.changePassword.bind(this));
        this.router.post("/forgot-password", this.forgotPassword.bind(this));
        this.router.post("/reset-password", this.resetPassword.bind(this));
    }

    async registerAdmin(req: Request, res: Response) {
        try {
            const { fullName, email, password } = req.body;

            const result = await new RegisterFirstAdmin(this.repository)
                .execute(fullName, email, password);

            res.status(201).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            const { employeeId, otp } = req.body;

            const result = await new VerifyRegistrationOtp(this.repository)
                .execute(employeeId, otp);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await new LoginEmployee(this.repository)
                .execute(email, password);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(401).json({ ok: false, error: error.message });
        }
    }

    async changePassword(req: AuthRequest, res: Response) {
        try {
            if (!req.employeeId) {
                res.status(401).json({ ok: false, error: "Authentication required" });
                return;
            }

            const { currentPassword, newPassword } = req.body;

            const result = await new ChangePassword(this.repository)
                .execute(req.employeeId, currentPassword, newPassword);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const result = await new ForgotPassword(this.repository)
                .execute(req.body.email);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, newPassword } = req.body;

            const result = await new ResetPassword(this.repository)
                .execute(token, newPassword);

            res.status(200).json({ ok: true, data: result });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }
}