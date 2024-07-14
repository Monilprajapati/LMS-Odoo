import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./src/config/databaseConfig.js";
import { PORT, FRONTEND_URL } from "./src/config/serverConfig.js";


await connectToDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: FRONTEND_URL || "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true, //for get header details like cookie...
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
})