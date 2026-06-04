const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

enrollmentSchema.index({ user: 1, material: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
