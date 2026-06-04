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

  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await api.get("/courses");
      setMaterials(Array.isArray(response.data) ? response.data : []);
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

  const filteredMaterials = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    return materials.filter((material) => {
      const title = material?.title?.toLowerCase() || "";
      const description = material?.description?.toLowerCase() || "";
      const subject = material?.subject || "";

      const matchesSearch =
        !keyword || title.includes(keyword) || description.includes(keyword);

      const matchesSubject =
        selectedSubject === "all" || subject === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [materials, searchTerm, selectedSubject]);

  const totalDuration = filteredMaterials.reduce(
    (total, material) => total + Number(material?.duration || 0),
    0,
  );

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
              <strong>{filteredMaterials.length}</strong>
              <span>Visible</span>
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
                  <Link
                    to={`/materials/${material._id}`}
                    className="btn btn-small"
                  >
                    View Detail
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
