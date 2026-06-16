const express = require("express");
const {
  getMyProgress,
  startMaterial,
  completeMaterial,
  removeProgress,
  updateMaterialProgress,
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, getMyProgress);
router.post("/:materialId/start", authMiddleware, startMaterial);
router.post("/:materialId/complete", authMiddleware, completeMaterial);
router.patch("/:materialId", authMiddleware, updateMaterialProgress);
router.delete("/:materialId", authMiddleware, removeProgress);

module.exports = router;
