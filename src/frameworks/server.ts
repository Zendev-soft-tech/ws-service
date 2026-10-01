import "reflect-metadata";
import express, { Router } from "express";
import cors from "cors";
import "dotenv/config";
import { AppDataSource } from "@/src/infrastructure/database.js";
import  routes  from "@/src/frameworks/routes.js";
import { Logger } from "@/src/shared/logger.js";
import router from "@/src/frameworks/routes.js";

const app =express();
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/hrms",router);
app.get("/",
    (_req, res) => {

        res.json({message:"HRMS Backend is running" });
    }
);
AppDataSource.initialize()

    .then(() => {

        Logger.info("Database connected successfully");
        const PORT =
            process.env.PORT
                ? Number(process.env.PORT)
                : 5000;
        app.listen(
            PORT,
            () => {Logger.info(`Server running on port ${PORT}`);}
        );

    })
    .catch((error) => {
        Logger.error(`Database connection failed: ${error}`);
    });