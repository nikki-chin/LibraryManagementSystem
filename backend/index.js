import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from './routes/booksRoutes.js';
import userRoute from './routes/usersRoutes.js';
import loanRoute from './routes/loan/loansRoutes.js';
import dashboardRoute from './routes/dashboard.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome');
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/books', bookRoute);

app.use('/auth', userRoute);

app.use('/loan', loanRoute);

app.use("/dashboard", dashboardRoute);

// app.get("/test", (req, res) => {
//   console.log("Test route hit!");
//   res.send("It works!");
// });


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });