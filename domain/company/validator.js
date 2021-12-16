import {body} from "express-validator";

export const companyCreateValidator = () => {
    return [
        body("location")
            .isString()
            .optional(),
        body("avatar")
            .isString()
            .optional(),
        body("description")
            .isString()
            .optional(),
        body("category")
            .isString()
            .optional(),
        body("title")
            .isString()
            .exists(),
    ];
}

export const companyUpdateValidator = () => {
    return [
        body("location")
            .isString()
            .optional(),
        body("avatar")
            .isString()
            .optional(),
        body("description")
            .isString()
            .optional(),
        body("category")
            .isString()
            .optional(),
        body("title")
            .isString()
            .exists(),
    ];
}
