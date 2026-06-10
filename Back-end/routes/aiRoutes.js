const express = require("express");
const authMiddleware = require("../middleware/auth");
const { askStudyAssistant } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", authMiddleware, askStudyAssistant);

module.exports = router;
