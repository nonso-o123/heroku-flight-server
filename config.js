import config from "dotenv";

config.config();

export default {
    TRAVELPAYOUTS: process.env.REACT_APP_TRAVELPAYOUTS_API,
    RAPIDAPI: process.env.RAPID_API,
    MONGODB: process.env.MONGODB_URL || 'mongodb://localhost/flightapp',
    TP_URL: process.env.TP_URL,
    JWT_SECRET: process.env.SECRET_ACCESS || 'anythingsecret',

    EMAIL: process.env.EMAIL,
    GMAIL_CLIENTID: process.env.GMAIL_CLIENTID,
    GMAIL_SECRET: process.env.GMAIL_SECRET,
    GMAIL_ACCESS_TOKEN: process.env.GMAIL_ACCESS_TOKEN,
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
    SVC_PRIVATE_KEY: process.env.SVC_PRIVATE_KEY,
    SVC_CLIENT: process.env.SVC_CLIENT,
}
