import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limir: "160kb" }));
app.use(cookieParser());

import todoRouter from "./routes/todo.routes.js";
app.use("/todo", todoRouter);

export { app };
