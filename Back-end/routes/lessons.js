const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

// GET semua lessons (harus login)
router.get("/", authMiddleware, getAllLessons);

// GET lesson berdasarkan ID (harus login)
router.get("/:id", authMiddleware, getLessonById);

// POST tambah lesson baru (harus login)
router.post("/", authMiddleware, createLesson);

// PUT update lesson (harus login)
router.put("/:id", authMiddleware, updateLesson);

// DELETE lesson (harus login)
router.delete("/:id", authMiddleware, deleteLesson);

module.exports = router;
