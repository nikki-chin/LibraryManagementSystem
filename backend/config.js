import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;

export const mongoDBURL = process.env.mongoDBURL;