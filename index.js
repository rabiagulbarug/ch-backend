import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import {createServer} from 'http';
import {authController} from "./domain/auth/controller.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        callback(null, true);
    },
}));

const router = express.Router();
router.use("/auth", authController());

app.use(router);

const server = createServer(app);

server.listen(+process.env.PORT);