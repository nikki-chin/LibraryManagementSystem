import express, { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

//Create a new user
router.post('/register', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required feild: name, email, password'
            })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
            role: request.body.role
        };


        const user = await User.create(newUser);

        return response.status(201).send(user);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//login
router.post('/login', async (request, response) => {
    try {
        if (!request.body.email || !request.body.password) {
            return response.status(400).send({
                message: "Please enter email and password"
            });
        }
        const { email, password } = request.body;

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        //const isMatch = await password === user.password;

        if (!isMatch) {
            return response.status(400).send({ message: "Invalid password" });
        }

        //jwt
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" });

        const refreshToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" });

        user.refreshToken = refreshToken;
        await user.save();

        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        response.json({ 
            email: user.email, 
            role: user.role, 
            name: user.name,
            id: user._id,
            accessToken: accessToken, 
            refreshToken: refreshToken });

            console.log("Login response accessToken:", accessToken);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/refresh', async (request, response) => {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
        return response.status(401).send({ message: "no token" });
    }

    const userToken = await User.findOne({ refreshToken });
    if (!userToken) return response.status(403).send({ message: "Invalid token" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return response.status(403).send({ message: "verify error" });
        }

        const newAccessToken = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" });

        response.json(newAccessToken);
    });
})

router.delete('/logout', async (request, response) => {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
        return response.status(403).send({ message: "no token" });
    }

    const userToken = await User.findOne({ refreshToken });
    if (!userToken) {
        return response.status(403).send({ message: "no token in DB" })
    }

    await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });

    response.clearCookie("refreshToken");
    return response.status(200).send({ message: "Logged out successfully" });
})

export default router;