import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/connectDB.js";

dotenv.config();

// Connect to database
dbConnection();

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// API Routes
app.use("/api", routes);

// **Backend health check route**
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Serve React frontend
const __dirname = path.resolve();
const clientBuildPath = path.join(__dirname, "client", "build");
app.use(express.static(clientBuildPath));

// SPA fallback for all other routes (after `/` and `/api`)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Error handling
app.use(routeNotFound);
app.use(errorHandler);

// **Vercel serverless export**
export default app;
