import { HttpStatusCode } from "axios";
import { QueryFailedError } from "typeorm";
import { Logger } from "@/src/shared/logger.js";

type ErrorDetails = {
    [key: string]: unknown;
};

export const StatusCode = HttpStatusCode;

export class AppError extends Error {
    constructor(
        public message: string,
        public errorCode: number,
        public details: ErrorDetails = {}
    ) {
        super(message);

        this.name = "AppError";

        Object.setPrototypeOf(
            this,
            AppError.prototype
        );
    }
}

export const DBError = (
    code: number,
    customMsg?: string,
    err?: QueryFailedError
): never => {

    Logger.error(
        `DB Error code: ${code}`
    );

    const errorMaps:
        Record<
            number,
            [string, number, ErrorDetails]
        > = {

        23505: [
            "Duplicate entry",
            StatusCode.BadRequest,
            {
                message: err?.message
            }
        ],

        23503: [
            "Entity in use",
            StatusCode.BadRequest,
            {
                message: err?.message
            }
        ]
    };

    const [
        defaultMsg,
        errorCode,
        details
    ] = errorMaps[code] ?? [
        err?.message ||
            "Database error",

        StatusCode.BadRequest,

        {
            dbCode: code,
            error: err
        }
    ];

    const renMsg =
        customMsg
            ? `: ${customMsg}`
            : "";

    const msg =
        `${defaultMsg}${renMsg}`;

    throw new AppError(
        msg,
        errorCode,
        details
    );
};