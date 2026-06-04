const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "❌ MONGO_URI is missing. Create Back-end/.env based on .env.example",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
