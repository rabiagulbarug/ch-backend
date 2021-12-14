import express from "express";
import {validationResult} from "express-validator";
import {database} from "../../db.js";
import bcrypt from "bcrypt";
import {loginValidator, registerValidator} from "./validator.js";
import jwt from 'jsonwebtoken';
import {authMiddleware, userMiddleware} from "./middleware.js";

export const authController = () => {
    const router = express.Router();
    router.post("/register", registerValidator(), register);
    router.post("/login", loginValidator(), login);
    router.get("/me", authMiddleware(), userMiddleware, me);
    return router;
}

async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    const {email, name, phone} = req.body;

    const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    const db = await database();
    const user = new db.user({name, password, email, phone});
    await user.save();

    res.status(200).json({...user.toObject(), password: undefined});
}

async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }

    const db = await database();
    const user = await db.user.findOne({email: req.body.email});

    if (user === null) {
        res.status(400).json({message: "Incorrect email"});
    }

    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    if (validatePassword) {
        const now = new Date();

        const token = jwt.sign({
            userId: user._id,
            expiresAt: new Date().setFullYear(now.getFullYear() + 1),
        }, process.env.SECRET, {algorithm: 'HS256'});

        const expires = 90 * 24 * 60 * 60;

        res.status(200).cookie('auth', token, {httpOnly: true, maxAge: expires, secure: false}).json({
            token,
            user: {...user.toObject(), password: undefined},
        });
    } else {
        res.status(400).json({message: 'Incorrect password'});
    }
}

async function me(req, res) {
    res.status(200).json({
        user: {...req.user, password: undefined},
    });
}
