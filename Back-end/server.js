const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 2. Konfigurasi CORS (Sudah Diperbaiki)
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// 3. Middleware
app.use(express.json());

// 4. Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// 5. Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/materialRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`),
);
