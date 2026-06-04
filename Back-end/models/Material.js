const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Mudah", "Menengah", "Sulit"],
      required: [true, "Difficulty is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: 1,
    },
    topics: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  { timestamps: true },
);

materialSchema.index({
  title: "text",
  description: "text",
  subject: "text",
});

module.exports = mongoose.model("Material", materialSchema);
