import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const subjectOptions = [
  "all",
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Indonesia",
  "Bahasa Inggris",
];

export default function Dashboard() {
  const { user } = useAuth();

  const [progressItems, setProgressItems] = useState([]);
  const [updatingMaterialId, setUpdatingMaterialId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [materialsResponse, progressResponse] = await Promise.all([
        api.get("/courses"),
        api.get("/progress"),
      ]);

      setMaterials(
        Array.isArray(materialsResponse.data) ? materialsResponse.data : [],
      );
      setProgressItems(
        Array.isArray(progressResponse.data) ? progressResponse.data : [],
      );
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Failed to load learning materials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const completedMaterialIds = useMemo(() => {
    return new Set(
      progressItems
        .filter((item) => item.status === "completed")
        .map((item) => item.material?._id || item.material),
    );
  }, [progressItems]);

  const completedCount = completedMaterialIds.size;

  const handleToggleComplete = async (materialId) => {
    try {
      setUpdatingMaterialId(materialId);

      if (completedMaterialIds.has(materialId)) {
        await api.delete(`/progress/${materialId}`);
      } else {
        await api.post(`/progress/${materialId}/complete`);
      }

      const progressResponse = await api.get("/progress");
      setProgressItems(
        Array.isArray(progressResponse.data) ? progressResponse.data : [],
      );
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Failed to update learning progress.",
      );
    } finally {
      setUpdatingMaterialId(null);
    }
  };

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <span className="eyebrow">Student Dashboard</span>
            <h1>Hi, {user?.name || "Student"} 👋</h1>
            <p>
              Explore learning materials, filter by subject, and prepare your
              study session with structured content.
            </p>

            <div className="hero-meta">
              <span>{user?.grade || "Grade 12"}</span>
              <span>{user?.school || "Your School"}</span>
            </div>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{materials.length}</strong>
              <span>Total Materials</span>
            </div>
            <div>
              <strong>{completedCount}</strong>
              <span>Completed</span>
            </div>
            <div>
              <strong>{totalDuration}</strong>
              <span>Minutes</span>
            </div>
          </div>
        </section>

        <section className="toolbar">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search material..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(event) => setSelectedSubject(event.target.value)}
          >
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject === "all" ? "All Subjects" : subject}
              </option>
            ))}
          </select>
        </section>

        {error && (
          <section className="state-card error-state">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchMaterials}
            >
              Try Again
            </button>
          </section>
        )}

        {isLoading && (
          <section className="materials-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="material-card skeleton" key={index}>
                <div />
                <div />
                <div />
              </div>
            ))}
          </section>
        )}

        {!isLoading && !error && filteredMaterials.length === 0 && (
          <section className="state-card">
            <h3>No materials found</h3>
            <p>Try changing the keyword or subject filter.</p>
          </section>
        )}

        {!isLoading && !error && filteredMaterials.length > 0 && (
          <section className="materials-grid">
            {filteredMaterials.map((material) => (
              <article className="material-card" key={material._id}>
                <div className="card-top">
                  <span className="subject-pill">{material.subject}</span>
                  <span
                    className={`difficulty ${material.difficulty?.toLowerCase()}`}
                  >
                    {material.difficulty}
                  </span>
                </div>

                <h3>{material.title}</h3>

                <p>{material.description}</p>

                <div className="topics">
                  {(material.topics || []).slice(0, 3).map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <span>{material.duration} min</span>

                  <div className="card-actions">
                    <button
                      type="button"
                      className={
                        completedMaterialIds.has(material._id)
                          ? "btn btn-completed"
                          : "btn btn-progress"
                      }
                      disabled={updatingMaterialId === material._id}
                      onClick={() => handleToggleComplete(material._id)}
                    >
                      {updatingMaterialId === material._id
                        ? "Updating..."
                        : completedMaterialIds.has(material._id)
                          ? "Completed"
                          : "Mark Done"}
                    </button>

                    <Link
                      to={`/materials/${material._id}`}
                      className="btn btn-small"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
