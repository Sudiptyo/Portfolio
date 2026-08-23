import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import { pinoHttp } from "pino-http";
import { logger } from "./Utils/logger.js";

const app = express();
const CORS_ORIGIN: string = process.env.CORS_ORIGIN ?? "http://localhost:5173";

// Injecting Middlewares

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(pinoHttp({ logger }));

// Import Routes

import clientRouter from "./Routes/clients.route.js";
import adminRouter from "./Routes/admin.route.js";

// Routes Declaration

app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/admin", adminRouter);

// 404 middleware
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export { app };
