import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const companySchema = new Schema({
    location: {type: Schema.Types.String, required: false},
    avatar: {type: Schema.Types.String, required: false},
    description: {type: Schema.Types.String, required: false},
    category: {type: Schema.Types.String, required: false},
    title: {type: Schema.Types.String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true}
})