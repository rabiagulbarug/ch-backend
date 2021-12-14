import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const postSchema = new Schema({
    title: {type: Schema.Types.String, required: true},
    requirement: {type: Schema.Types.String, required: false},
    position: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String, required: false},
    perks: {type: Schema.Types.String, required: false},
    companyId: {type: Schema.Types.ObjectId, required: true}
})