import jwt from "express-jwt";
import {database} from "../../db.js";

export const authMiddleware = () => jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: (req) => {
        return req.header("Authorization")?.replace("Bearer ", "");
    }
})

export const userMiddleware = async (req, res, next) => {
    const db = await database();
    const user = await db.user.findById(req.user.userId);
    req.user = user.toObject();
    next();
}