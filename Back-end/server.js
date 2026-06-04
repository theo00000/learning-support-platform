const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const lessonRoutes = require("./routes/lessons");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "learning-support-platform-api",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", materialRoutes);
app.use("/api/lessons", lessonRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);

  res.status(err.status || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ API server running on http://0.0.0.0:${PORT}`);
  });
});
