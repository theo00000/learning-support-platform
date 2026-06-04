const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

const router = express.Router();

router.get("/", authMiddleware, getAllLessons);
router.get("/:id", authMiddleware, getLessonById);
router.post("/", authMiddleware, createLesson);
router.put("/:id", authMiddleware, updateLesson);
router.delete("/:id", authMiddleware, deleteLesson);

module.exports = router;
