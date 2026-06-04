const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getMyProgress,
  markMaterialCompleted,
  resetMaterialProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.get("/", authMiddleware, getMyProgress);
router.post("/:materialId/complete", authMiddleware, markMaterialCompleted);
router.delete("/:materialId", authMiddleware, resetMaterialProgress);

module.exports = router;
