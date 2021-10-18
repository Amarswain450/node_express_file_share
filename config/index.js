import dotenv from 'dotenv';
dotenv.config()

export const {
    APP_PORT,
    APP_URL,
    SMTP_HOST,
    SMTP_PORT,
    MAIL_USER,
    MAIL_PASSWORD
} = process.env;