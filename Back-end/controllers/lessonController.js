const Lesson = require("../models/Lesson");
const Material = require("../models/Material");

exports.getAllLessons = async (_req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate("material", "title subject difficulty")
      .sort({ createdAt: -1 });

    return res.json(lessons);
  } catch (err) {
    console.error("Get lessons error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching lessons",
    });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate(
      "material",
      "title subject difficulty",
    );

    if (!lesson) {
      return res.status(404).json({
        msg: "Lesson not found",
      });
    }

    return res.json(lesson);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid lesson ID",
      });
    }

    console.error("Get lesson detail error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching lesson detail",
    });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { title, content, videoUrl = "", material } = req.body;

    if (!title || !content || !material) {
      return res.status(400).json({
        msg: "Title, content, and material are required",
      });
    }

    const materialExists = await Material.findById(material);

    if (!materialExists) {
      return res.status(404).json({
        msg: "Material not found",
      });
    }

    const lesson = await Lesson.create({
      title,
      content,
      videoUrl,
      material,
    });

    return res.status(201).json(lesson);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid material ID",
      });
    }

    console.error("Create lesson error:", err.message);

    return res.status(500).json({
      msg: "Server error while creating lesson",
    });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lesson) {
      return res.status(404).json({
        msg: "Lesson not found",
      });
    }

    return res.json(lesson);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid lesson ID",
      });
    }

    console.error("Update lesson error:", err.message);

    return res.status(500).json({
      msg: "Server error while updating lesson",
    });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        msg: "Lesson not found",
      });
    }

    return res.json({
      msg: "Lesson deleted successfully",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        msg: "Invalid lesson ID",
      });
    }

    console.error("Delete lesson error:", err.message);

    return res.status(500).json({
      msg: "Server error while deleting lesson",
    });
  }
};
