import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize Express application
const app = express();

// Middleware to enable CORS with credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from this origin
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);

// Middleware to parse JSON request bodies with size limit
app.use(express.json({ limit: "160kb" }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Import and use Todo routes from todo.routes.js
import todoRouter from "./routes/todo.routes.js";
app.use("/todo", todoRouter); // Mount the Todo routes under /todo path

// Export the configured Express application
export { app };
