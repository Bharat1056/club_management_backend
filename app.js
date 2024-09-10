import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from "./router/user.routes.js"
import clubRouter from "./router/club.routes.js"


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public")) 
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/clubs", clubRouter)


export default app