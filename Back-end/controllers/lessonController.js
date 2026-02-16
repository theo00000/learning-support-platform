const Lesson = require("../models/Lesson");

// GET semua lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET Lesson
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.find().populate("material");
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET lesson berdasarkan ID
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST tambah lesson baru
exports.createLesson = async (req, res) => {
  const { title, materialId, content } = req.body;
  try {
    const lesson = new Lesson({ title, materialId, content });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update lesson
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
