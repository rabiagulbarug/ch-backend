import express from "express";
import {authMiddleware, userMiddleware} from "../auth/middleware.js";
import {postCreateValidator} from "./validator.js";
import {database} from "../../db.js";
import {validationResult} from "express-validator";

export const postController = () => {
    const router = express.Router();
    router.get('/:companyId', postList);
    router.get('/:companyId/:id', postDetail);
    router.post("/:companyId", authMiddleware(), userMiddleware, postCreateValidator(), postCreate);
    return router;
}

async function postList(req, res) {
    const companyId = req.params.companyId;
    const db = await database();
    const posts = await db.post.find({companyId});

    res.status(200).json({posts});
}

async function postDetail(req, res) {
    const companyId = req.params.companyId;
    const id = req.params.id;
    const db = await database();
    const post = await db.post.findOne({id, companyId});

    if(post === null) {
        res.status(404).json({message: 'not found'});
    }

    res.status(200).json({post: post.toObject()});
}

async function postCreate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const companyId = req.params.companyId;
    const db = await database();
    const {title, requirement, position, description, perks} = req.body;

    const post = new db.post({title, requirement, position, description, perks, companyId});
    await post.save();

    res.status(200).json({post: post.toObject()});
}