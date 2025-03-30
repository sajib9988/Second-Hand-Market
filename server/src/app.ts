import cors from "cors";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// Middleware setup
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main API Route
app.use("/api/v1", router);

// Test Route (Minimal Response)
app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Welcome to the Second hand Market",
    version: "1.0.0",
  });
});

// Global Error Handling
app.use(globalErrorHandler);

// 404 Not Found Handler
app.use(notFound);

export default app;
