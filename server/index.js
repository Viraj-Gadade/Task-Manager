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

// Connect to the database
dbConnection();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // adjust for frontend URL
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

// Serve React frontend in production
const __dirname = path.resolve();
const clientBuildPath = path.join(__dirname, "client", "build");

// Only serve frontend if build folder exists (avoids ENOENT on Vercel if not built)
import fs from "fs";
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // For SPA routing, send index.html for all unmatched routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  console.warn("React build folder not found. Make sure you run `npm run build` in /client.");
}

// Error handling
app.use(routeNotFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
