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

// Connect to DB
dbConnection();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // adjust if needed
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
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Error handling middleware
app.use(routeNotFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
