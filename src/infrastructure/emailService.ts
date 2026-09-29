import nodemailer from "nodemailer";

import { config } from "@/src/config/index.js";


export const sendEmail =
    async (
        to: string,
        subject: string,
        text: string
    ) => {

        const transporter =
            nodemailer.createTransport({

                service:
                    config.email.service,

                auth: {

                    user:
                        config.email.user,

                    pass:
                        config.email.password
                }
            });


        await transporter.sendMail({

            from:
                config.email.user,

            to,

            subject,

            text
        });
    };