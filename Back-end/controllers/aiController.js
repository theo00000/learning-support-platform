const OpenAI = require("openai");
const Material = require("../models/Material");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const buildMaterialContext = (materials) => {
  if (!materials.length) {
    return "No relevant learning material found in the database.";
  }

  return materials
    .map((material, index) => {
      return `
Material ${index + 1}
Title: ${material.title}
Subject: ${material.subject}
Difficulty: ${material.difficulty}
Description: ${material.description}
Content:
${material.content || "No detailed content available."}
`;
    })
    .join("\n---\n");
};

exports.askStudyAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        msg: "Question is required",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        msg: "OPENAI_API_KEY is missing",
      });
    }

    const keyword = question.trim();

    const relevantMaterials = await Material.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subject: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    }).limit(3);

    const context = buildMaterialContext(relevantMaterials);

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are an AI Study Assistant for high school students. Answer clearly and simply in Indonesian. Use the provided learning materials as the main context. If the context is limited, say that the available material is limited and provide a careful general explanation.",
        },
        {
          role: "user",
          content: `
Student question:
${question}

Learning material context:
${context}

Please answer with:
1. A simple explanation
2. Key points
3. A short study tip
`,
        },
      ],
    });

    return res.json({
      question,
      answer: response.output_text,
      sources: relevantMaterials.map((material) => ({
        id: material._id,
        title: material.title,
        subject: material.subject,
      })),
    });
  } catch (err) {
    console.error("AI assistant error:", {
      message: err.message,
      status: err.status,
      code: err.code,
      type: err.type,
      error: err.error,
    });

    if (err.code === "insufficient_quota") {
      return res.status(429).json({
        msg: "AI quota is currently unavailable. Please check OpenAI billing or try again later.",
        detail:
          "The AI feature is connected successfully, but the OpenAI API quota is not available.",
      });
    }

    return res.status(500).json({
      msg: "Server error while generating AI response",
      detail: err.message,
      status: err.status,
      code: err.code,
      type: err.type,
    });
  }
};
