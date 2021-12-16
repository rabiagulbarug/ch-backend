import express from "express";
import {validationResult} from "express-validator";
import {database} from "../../db.js";
import {authMiddleware, userMiddleware} from "../auth/middleware.js";
import {companyCreateValidator, companyUpdateValidator} from "./validator.js";

export const companyController = () => {
    const router = express.Router();
    router.get('/', companyList);
    router.get('/:id', companyDetail);
    router.post("/", authMiddleware(), userMiddleware, companyCreateValidator(), companyCreate);
    router.put('/:id', authMiddleware(), userMiddleware, companyUpdateValidator(), companyUpdate);
    return router;
}

async function companyList(req, res) {
    const db = await database();
    const companies = await db.company.find();
    console.log({companies});

    res.status(200).json({companies});
}

async function companyDetail(req, res) {
    const db = await database();
    const company = await db.company.findOne({id: req.params.id});

    if(company === null) {
        res.status(404).json({message: 'not found'});
    }

    res.status(200).json({company: company.toObject()});
}

async function companyCreate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    const {location, avatar, description, category, title} = req.body;
    const db = await database();
    const userId = req.user._id;
    const company = new db.company({location, avatar, description, category, title, userId});
    await company.save();

    res.status(200).json({company: company.toObject()});
}

async function companyUpdate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    const {location, avatar, description, category, title} = req.body;
    const db = await database();
    const userId = req.user._id;

    await db.company.findOneAndUpdate({id: req.params.id, userId}, {location, avatar, description, category, title});
    const company = await db.company.findOne({id: req.params.id});

    if(company === null) {
        res.status(404).json({message: 'not found'});
    }

    res.status(200).json({company: company.toObject()});
}