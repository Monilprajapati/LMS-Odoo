import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./src/config/databaseConfig.js";
import { PORT, FRONTEND_URL } from "./src/config/serverConfig.js";
import { createCheckoutSession } from "./src/controllers/paymentController.js";
import authRoute from "./src/routes/authRoute.js";
import bookRoute from "./src/routes/bookRoute.js";
import borrowRoute from "./src/routes/borrowRoute.js";
import adminRoute from "./src/routes/adminRoute.js";
import userRoute from "./src/routes/userRoute.js";


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

app.use(`/api/v1/auth`, authRoute);
app.use(`/api/v1/books`, bookRoute);
app.use(`/api/v1/borrows`, borrowRoute);
app.use(`/api/v1/admin`, adminRoute);
app.use(`/api/v1/users`, userRoute);
app.use(`/api/v1/create-checkout-session`, createCheckoutSession);

app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
})