import {body} from "express-validator";

export const postCreateValidator = () => {
    return [
        body('title')
            .isString(),
        body('requirement')
            .isString()
            .optional(),
        body('position')
            .isString(),
        body('description')
            .isString()
            .optional(),
        body('perks')
            .isString()
            .optional()
    ];
}