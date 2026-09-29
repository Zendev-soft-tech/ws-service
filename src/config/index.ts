import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import defaultConfig from "@/src/config/default.js";
import { Logger } from "@/src/shared/logger.js";

dotenv.config();

export type AppConfig = {
    serverPort: number;
    serverUrl: string;
    jwtSecret: string;
    postgresDb: PostgresDBConfig;
    email: EmailConfig;
    mobileAppLink: string;
};

export type EmailConfig = {
    user: string;
    password: string;
    service: string;
};

export type PostgresDBConfig = {
    db: string;
    dbPort: number;
    dbName: string;
    dbHost: string;
    dbPassword: string;
};

export class Config {
    public static config: AppConfig | null = null;

    private static load = (): AppConfig => {
        if (process.env.CONFIG_PATH) {
            const configFilePath = path.resolve(process.env.CONFIG_PATH);
            Logger.info(`Loading configurations from ${configFilePath}`);

            const configFileContent = fs.readFileSync(
                configFilePath,
                "utf-8"
            );

            return JSON.parse(configFileContent) as AppConfig;
        }

        return defaultConfig;
    };

    static get = (): AppConfig => {
        if (!Config.config) {
            Config.config = Config.load();
        }

        return Config.config;
    };
}

export const config = Config.get();