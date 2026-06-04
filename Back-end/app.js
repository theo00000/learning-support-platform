const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const lessonRoutes = require("./routes/lessons");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    message: "Learning Support Platform API",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "learning-support-platform-api",
  });
});

app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    return res.status(500).json({
      msg: "Database connection failed",
      detail: err.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", materialRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
