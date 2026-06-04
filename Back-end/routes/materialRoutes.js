const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getAllMaterials,
  getMaterialById,
} = require("../controllers/materialController");

const router = express.Router();

router.get("/", authMiddleware, getAllMaterials);
router.get("/:id", authMiddleware, getMaterialById);

module.exports = router;
