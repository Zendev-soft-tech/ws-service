import type { Request, Response } from "express";
import { UserRepository } from "@/src/adapters/repositories/userRepository.js";
import { EmployeeRepository } from "@/src/adapters/repositories/employeeRepository.js";
import { RegisterUser } from "@/src/application/usecases/user/RegisterUser.js";
import { LoginUser } from "@/src/application/usecases/user/LoginUser.js";
import { GetUsers } from "@/src/application/usecases/user/GetUsers.js";
import { GetUserById } from "@/src/application/usecases/user/GetUserById.js";
import { GetUserByEmail } from "@/src/application/usecases/user/GetUserByEmail.js";
import { UpdateUser } from "@/src/application/usecases/user/UpdateUser.js";
import { DeleteUser } from "@/src/application/usecases/user/DeleteUser.js";

const userRepository = new UserRepository();
const employeeRepository = new EmployeeRepository();

const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(
    userRepository,
    employeeRepository
);
const getUsers = new GetUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const getUserByEmail = new GetUserByEmail(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await registerUser.execute(
            email,
            password
        );

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser.execute(
            email,
            password
        );

        res.json(result);
    } catch (error: any) {
        res.status(401).json({
            message: error.message
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await getUsers.execute();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const result = await getUserById.execute(id);

        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email || Array.isArray(email)) {
            return res.status(400).json({
                message: "Invalid user email"
            });
        }

        const result = await getUserByEmail.execute(email);

        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const result = await updateUser.execute(
            id,
            req.body
        );

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const result = await deleteUser.execute(id);

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};