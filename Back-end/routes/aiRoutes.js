const express = require("express");
const { askAI } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/ask", authMiddleware, askAI);

module.exports = router;
