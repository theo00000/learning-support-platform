const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://learning-support-platform-4q3x.vercel.app",
];

if (process.env.CLIENT_ORIGIN) {
  allowedOrigins.push(
    ...process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    message: "API is running",
  });
});

module.exports = app;
