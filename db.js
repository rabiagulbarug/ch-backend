import mongoose from "mongoose";
import {userSchema} from "./database/user.js";
import {companySchema} from "./database/company.js";
import {postSchema} from "./database/post.js";

const connectDatabase = () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    const name = process.env.DB_NAME;
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${host}:${port}/${name}`, {
            user,
            pass,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(db => resolve(db)).catch(err => reject(err))
    });
}
export const database = async () => {
    const db = await connectDatabase();
    const user = db.model("User", userSchema);
    const company = db.model("Company", companySchema);
    const post = db.model("Post", postSchema);
    return {db, user, company, post};
}
