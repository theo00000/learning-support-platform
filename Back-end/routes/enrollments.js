const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  enrolledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
