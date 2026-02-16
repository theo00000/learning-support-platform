const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const authRoutes = require("./authRoutes");
const {
  getAllMaterials,
  getMaterialById,
} = require("../controllers/materialController");

router.get("/", authMiddleware, getAllMaterials);

router.get("/:id", authMiddleware, getMaterialById);

module.exports = router;
