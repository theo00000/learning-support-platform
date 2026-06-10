import { useState } from "react";
import api from "../services/api";

const suggestedQuestions = [
  "Jelaskan materi matematika dengan bahasa sederhana",
  "Buat rangkuman singkat dari materi yang tersedia",
  "Kasih tips belajar untuk memahami materi sulit",
];

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

      const response = await api.post("/ai/ask", { question });

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

  const handleSuggestionClick = (text) => {
    setQuestion(text);
    setError("");
  };

  return (
    <section className="ai-feature-card">
      <div className="ai-feature-main">
        <div className="ai-feature-badge">
          <span>✦</span>
          AI Study Assistant
        </div>

        <h2>Study smarter with your learning companion</h2>

        <p>
          Ask questions about available learning materials and get simple
          explanations, key points, and practical study tips.
        </p>

        <div className="ai-suggestion-list">
          {suggestedQuestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={handleAsk} className="ai-feature-form">
          <div className="ai-input-shell">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask anything about your learning materials..."
              rows={4}
            />

            <div className="ai-input-footer">
              <span>{question.length}/300</span>

              <button type="submit" disabled={isAsking}>
                {isAsking ? (
                  <>
                    <span className="ai-loading-dot" />
                    Thinking
                  </>
                ) : (
                  "Ask AI"
                )}
              </button>
            </div>
          </div>
        </form>

        {error && <div className="ai-feature-error">{error}</div>}
      </div>

      <aside className="ai-feature-side">
        <div className="ai-orb">
          <span>AI</span>
        </div>

        <div className="ai-side-content">
          <span className="ai-side-label">Powered learning</span>
          <h3>Context-aware answers</h3>
          <p>
            The assistant uses available course materials as context before
            generating a response.
          </p>
        </div>

        <div className="ai-mini-grid">
          <div>
            <span>01</span>
            <strong>Simple explanation</strong>
          </div>
          <div>
            <span>02</span>
            <strong>Key points</strong>
          </div>
          <div>
            <span>03</span>
            <strong>Study tips</strong>
          </div>
        </div>
      </aside>

      {(answer || sources.length > 0) && (
        <div className="ai-feature-response">
          {answer && (
            <div className="ai-answer-card">
              <div className="ai-answer-header">
                <span>AI Answer</span>
                <small>Generated response</small>
              </div>
              <p>{answer}</p>
            </div>
          )}

          {sources.length > 0 && (
            <div className="ai-source-card">
              <div className="ai-answer-header">
                <span>Related Materials</span>
                <small>Used as context</small>
              </div>

              <div className="ai-source-list">
                {sources.map((source) => (
                  <span key={source.id}>
                    {source.subject} · {source.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
