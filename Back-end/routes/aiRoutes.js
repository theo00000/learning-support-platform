const express = require("express");
const { askAI } = require("../controllers/aiController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/ask", authMiddleware, askAI);

module.exports = router;
