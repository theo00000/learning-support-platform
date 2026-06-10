import { useState } from "react";
import api from "../services/api";

export default function AIStudyAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async (event) => {
    event.preventDefault();

    if (!question.trim()) {
      setError("Please write a question first.");
      return;
    }

    try {
      setIsAsking(true);
      setError("");
      setAnswer("");
      setSources([]);

      const response = await api.post("/ai/ask", {
        question,
      });

      setAnswer(response.data.answer || "");
      setSources(
        Array.isArray(response.data.sources) ? response.data.sources : [],
      );
    } catch (err) {
      console.log("AI ASSISTANT ERROR:", {
        message: err.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });

      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          err.message ||
          "Failed to ask AI assistant.",
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <section className="ai-card">
      <div>
        <span className="eyebrow">AI Study Assistant</span>
        <h2>Ask about your learning materials</h2>
        <p>
          Ask a question and the assistant will answer using available learning
          materials as context.
        </p>
      </div>

      <form onSubmit={handleAsk} className="ai-form">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: Jelaskan hukum Newton 2 dengan bahasa sederhana"
          rows={3}
        />

        <button type="submit" className="btn btn-primary" disabled={isAsking}>
          {isAsking ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {answer && (
        <div className="ai-answer">
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="ai-sources">
          <h3>Related Materials</h3>
          <div className="topics">
            {sources.map((source) => (
              <span key={source.id}>
                {source.subject} · {source.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
