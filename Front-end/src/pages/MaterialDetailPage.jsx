import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function MaterialDetail() {
  const { id } = useParams();

  const [material, setMaterial] = useState(null);
  const [relatedMaterials, setRelatedMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMaterial = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [detailResponse, materialsResponse] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get("/courses"),
      ]);

      const detail = detailResponse.data;
      const allMaterials = Array.isArray(materialsResponse.data)
        ? materialsResponse.data
        : [];

      setMaterial(detail);

      setRelatedMaterials(
        allMaterials
          .filter(
            (item) =>
              item._id !== detail._id && item.subject === detail.subject,
          )
          .slice(0, 3),
      );
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Failed to load material detail.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const contentBlocks = useMemo(() => {
    if (!material?.content) return [];

    return material.content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }, [material]);

  return (
    <>
      <Navbar />

      <main className="detail-page">
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>

        {isLoading && (
          <section className="detail-card">
            <div className="spinner" />
            <p>Loading material detail...</p>
          </section>
        )}

        {error && (
          <section className="state-card error-state">
            <h3>Material not available</h3>
            <p>{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchMaterial}
            >
              Try Again
            </button>
          </section>
        )}

        {!isLoading && !error && material && (
          <>
            <section className="detail-card">
              <div className="card-top">
                <span className="subject-pill">{material.subject}</span>
                <span
                  className={`difficulty ${material.difficulty?.toLowerCase()}`}
                >
                  {material.difficulty}
                </span>
              </div>

              <h1>{material.title}</h1>
              <p className="detail-description">{material.description}</p>

              <div className="detail-meta">
                <span>Category: {material.category || "General"}</span>
                <span>Duration: {material.duration} minutes</span>
              </div>

              <div className="topics">
                {(material.topics || []).map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2>Learning Content</h2>

              <div className="content-body">
                {contentBlocks.map((block, index) => {
                  if (block.startsWith("# ")) {
                    return <h1 key={index}>{block.replace("# ", "")}</h1>;
                  }

                  if (block.startsWith("## ")) {
                    return <h2 key={index}>{block.replace("## ", "")}</h2>;
                  }

                  if (/^\d+\./.test(block)) {
                    return (
                      <p key={index} className="numbered-line">
                        {block}
                      </p>
                    );
                  }

                  if (block.startsWith("- ")) {
                    return (
                      <p key={index} className="bullet-line">
                        {block}
                      </p>
                    );
                  }

                  return <p key={index}>{block}</p>;
                })}
              </div>
            </section>

            {relatedMaterials.length > 0 && (
              <section className="related-section">
                <h2>Related Materials</h2>

                <div className="materials-grid compact">
                  {relatedMaterials.map((item) => (
                    <article className="material-card" key={item._id}>
                      <span className="subject-pill">{item.subject}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      <div className="card-footer">
                        <span>{item.duration} min</span>
                        <Link
                          to={`/materials/${item._id}`}
                          className="btn btn-small"
                        >
                          Open
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
