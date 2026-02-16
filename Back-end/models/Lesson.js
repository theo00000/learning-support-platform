const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  // This links the Lesson to a specific Material (Course)
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lesson", LessonSchema);
