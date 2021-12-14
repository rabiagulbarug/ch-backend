import {body} from "express-validator";
import {database} from "../../db.js";

export const registerValidator = () => {
    return [
        body("email")
            .exists()
            .isEmail()
            .custom(async (email) => {
                const db = await database();
                const user = await db.user.findOne({email});
                if (user !== null) {
                    return Promise.reject();
                }
            }),
        body("password")
            .isString()
            .exists(),
        body("phone")
            .isString(),
        body("name")
            .isString(),
    ];
}

export const loginValidator = () => {
    return [
        body("email")
            .exists()
            .isEmail(),
        body("password")
            .isString()
            .exists(),
    ]
}