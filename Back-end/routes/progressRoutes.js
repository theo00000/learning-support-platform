const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getMyProgress,
  markMaterialCompleted,
  resetMaterialProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.get("/", authMiddleware, getMyProgress);
router.post("/:materialId/start", authMiddleware, startMaterial);
router.patch("/:materialId", authMiddleware, updateMaterialProgress);
router.post("/:materialId/complete", authMiddleware, completeMaterial);
router.delete("/:materialId", authMiddleware, removeProgress);

module.exports = router;
