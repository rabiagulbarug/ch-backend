import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
    name: {type: Schema.Types.String, required: false},
    phone: {type: Schema.Types.String, required: false},
    email: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true}
})
