const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: String,
    subject: String,
    difficulty: String,
    duration: {
      type: String,
      required: true,
    },
    summary: String,
    content: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Material", materialSchema);
