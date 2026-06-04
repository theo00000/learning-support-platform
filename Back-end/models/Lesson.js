const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    videoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: [true, "Material is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lesson", lessonSchema);
