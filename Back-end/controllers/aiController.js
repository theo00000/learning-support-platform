const Material = require("../models/Material");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

const buildMaterialContext = (materials = []) => {
  if (!materials.length) {
    return "No learning materials are available yet.";
  }

  return materials
    .slice(0, 12)
    .map((material, index) => {
      const topics = Array.isArray(material.topics)
        ? material.topics.join(", ")
        : "";

      return [
        `Material ${index + 1}`,
        `Title: ${material.title || "-"}`,
        `Subject: ${material.subject || "-"}`,
        `Difficulty: ${material.difficulty || "-"}`,
        `Description: ${material.description || "-"}`,
        `Topics: ${topics || "-"}`,
        `Content: ${String(material.content || "").slice(0, 900) || "-"}`,
      ].join("\n");
    })
    .join("\n\n");
};

const callGemini = async (prompt) => {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 700,
        },
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);

    throw new Error(
      data?.error?.message || "Failed to generate answer with Gemini",
    );
  }

  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() || "I could not generate an answer right now."
  );
};

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        msg: "Question is required",
      });
    }

    const materials = await Material.find({})
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    const context = buildMaterialContext(materials);

    const prompt = `
You are an AI Study Assistant inside a Learning Support Platform.

Your task:
- Answer the student's question clearly.
- Use simple language.
- Prioritize the learning material context provided below.
- If the answer is not directly found in the material, explain using general knowledge but mention that it is a general explanation.
- Keep the answer concise, structured, and student-friendly.
- Do not make up course data that is not provided.

Student question:
${question.trim()}

Learning material context:
${context}

Answer:
`;

    const answer = await callGemini(prompt);

    const sources = materials.slice(0, 5).map((material) => ({
      id: material._id,
      title: material.title,
      subject: material.subject,
    }));

    return res.json({
      answer,
      sources,
    });
  } catch (err) {
    console.error("AI assistant error:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      msg: "Server error while generating AI answer",
      detail: err.message,
    });
  }
};
