import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/src/adapters/models/User.js";
import { Employee } from "@/src/adapters/models/Employee.js";
import { Department } from "@/src/adapters/models/Department.js";
import { Designation } from "@/src/adapters/models/Designation.js";
import { Location } from "@/src/adapters/models/Location.js";
import { Attendance } from "@/src/adapters/models/Attendance.js";
import { Leave } from "@/src/adapters/models/Leave.js";
import { Permission } from "@/src/adapters/models/Permission.js";

import { DirectChat } from "@/src/adapters/models/DirectChat.js";
import { DirectMessage } from "@/src/adapters/models/DirectMessage.js";
import { GroupChat } from "@/src/adapters/models/GroupChat.js";
import { GroupMember } from "@/src/adapters/models/GroupMembers.js";
import { GroupMessage } from "@/src/adapters/models/GroupMessage.js";
import { config } from "@/src/config/index.js";

export const AppDataSource =new DataSource({
        type: "postgres",
        host:  config.postgresDb.dbHost,
        port:  config.postgresDb.dbPort,
        username:  config.postgresDb.db,
        password:  config.postgresDb.dbPassword,
        database:  config.postgresDb.dbName,
        synchronize: true,
        logging: false,
        entities: [
            User,
            Employee,
            Department,
            Designation,
            Location,
            Attendance,
            Leave,
            Permission,
            DirectChat,
            DirectMessage,
            GroupChat,
            GroupMember,
            GroupMessage
        ]
    });
