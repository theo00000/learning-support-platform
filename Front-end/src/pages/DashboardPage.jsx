import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import AIStudyAssistant from "../components/AIStudyAssistant";
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

const getProgressMaterialId = (item) => {
  if (typeof item?.material === "string") {
    return item.material;
  }

  return item?.material?._id;
};

const clampProgress = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.min(Math.max(number, 0), 100);
};

export default function Dashboard() {
  const { user } = useAuth();

  const [materials, setMaterials] = useState([]);
  const [progressItems, setProgressItems] = useState([]);
  const [updatingMaterialId, setUpdatingMaterialId] = useState(null);
  const cabinetSectionRef = useRef(null);
  const [recentlyAddedMaterialId, setRecentlyAddedMaterialId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
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
      console.log("DASHBOARD ERROR:", {
        message: err.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });

      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          err.message ||
          "Failed to load dashboard data.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const materialsById = useMemo(() => {
    return new Map(materials.map((material) => [material._id, material]));
  }, [materials]);

  const cabinetMaterials = useMemo(() => {
    return progressItems
      .map((item) => {
        const materialId = getProgressMaterialId(item);

        const material =
          typeof item?.material === "object" && item.material
            ? item.material
            : materialsById.get(materialId);

        if (!material) {
          return null;
        }

        const status = item?.status || "in_progress";
        const progressPercent = clampProgress(
          item?.progress ??
            item?.percentage ??
            (status === "completed" ? 100 : 10),
        );

        return {
          ...material,
          progressStatus: status,
          progressPercent,
        };
      })
      .filter(Boolean);
  }, [progressItems, materialsById]);

  const cabinetMaterialIds = useMemo(() => {
    return new Set(cabinetMaterials.map((material) => material._id));
  }, [cabinetMaterials]);

  const completedMaterialIds = useMemo(() => {
    return new Set(
      progressItems
        .filter((item) => item?.status === "completed")
        .map(getProgressMaterialId)
        .filter(Boolean),
    );
  }, [progressItems]);

  const filteredExploreMaterials = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    return materials.filter((material) => {
      const title = material?.title?.toLowerCase() || "";
      const description = material?.description?.toLowerCase() || "";
      const subject = material?.subject || "";

      const matchesSearch =
        !keyword || title.includes(keyword) || description.includes(keyword);

      const matchesSubject =
        selectedSubject === "all" || subject === selectedSubject;

      const isAlreadyInCabinet = cabinetMaterialIds.has(material._id);

      return matchesSearch && matchesSubject && !isAlreadyInCabinet;
    });
  }, [materials, searchTerm, selectedSubject, cabinetMaterialIds]);

  const completedCount = cabinetMaterials.filter(
    (material) => material.progressStatus === "completed",
  ).length;

  const cabinetProgressPercent =
    cabinetMaterials.length > 0
      ? Math.round((completedCount / cabinetMaterials.length) * 100)
      : 0;

  const totalLearningMinutes = cabinetMaterials.reduce(
    (total, material) => total + Number(material?.duration || 0),
    0,
  );

  const handleToggleComplete = async (materialId) => {
    try {
      setUpdatingMaterialId(materialId);
      setError("");

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
      console.log("PROGRESS ERROR:", {
        message: err.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });

      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          err.message ||
          "Failed to update learning progress.",
      );
    } finally {
      setUpdatingMaterialId(null);
    }
  };

  const handleStartMaterial = async (materialId) => {
    try {
      setUpdatingMaterialId(materialId);
      setError("");
      setSuccessMessage("");

      await api.post(`/progress/${materialId}/start`);

      const progressResponse = await api.get("/progress");
      setProgressItems(
        Array.isArray(progressResponse.data) ? progressResponse.data : [],
      );

      setRecentlyAddedMaterialId(materialId);
      setSuccessMessage("Material added to your cabinet ✨");

      window.setTimeout(() => {
        cabinetSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);

      window.setTimeout(() => {
        setRecentlyAddedMaterialId(null);
        setSuccessMessage("");
      }, 2800);
    } catch (err) {
      console.log("START MATERIAL ERROR:", {
        message: err.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });

      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          err.message ||
          "Failed to add material to cabinet.",
      );
    } finally {
      setUpdatingMaterialId(null);
    }
  };

  const renderMaterialCard = (material, options = {}) => {
    const isCabinetCard = options.isCabinetCard || false;
    const isCompleted = completedMaterialIds.has(material._id);
    const isUpdating = updatingMaterialId === material._id;

    const progressPercent = isCabinetCard
      ? clampProgress(material.progressPercent)
      : 0;

    return (
      <article
        className={[
          "material-card",
          isCompleted ? "material-card-completed" : "",
          isCabinetCard && recentlyAddedMaterialId === material._id
            ? "material-card-new"
            : "",
          !isCabinetCard && isUpdating ? "material-card-adding" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        key={material._id}
      >
        <div className="card-top">
          <span className="subject-pill">{material.subject}</span>
          <span className={`difficulty ${material.difficulty?.toLowerCase()}`}>
            {material.difficulty}
          </span>
        </div>

        <h3>{material.title}</h3>
        <p>{material.description}</p>

        {isCabinetCard && (
          <div className="material-progress">
            <div className="material-progress-header">
              <span>{isCompleted ? "Completed" : "In Progress"}</span>
              <strong>{progressPercent}%</strong>
            </div>
            <div className="material-progress-track">
              <div
                className="material-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="topics">
          {(material.topics || []).slice(0, 3).map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>

        <div className="card-footer">
          <span>{material.duration} min</span>

          <div className="card-actions">
            {isCabinetCard ? (
              <button
                type="button"
                className={
                  isCompleted ? "btn btn-completed" : "btn btn-progress"
                }
                disabled={isUpdating || isCompleted}
                onClick={() => handleToggleComplete(material._id)}
              >
                {isUpdating
                  ? "Updating..."
                  : isCompleted
                    ? "Completed"
                    : "Mark Done"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-progress"
                disabled={isUpdating}
                onClick={() => handleStartMaterial(material._id)}
              >
                {isUpdating ? "Adding..." : "Add to Cabinet"}
              </button>
            )}

            <Link to={`/materials/${material._id}`} className="btn btn-small">
              {isCabinetCard ? "Continue" : "View"}
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <span className="eyebrow">Personal Learning Cabinet</span>
            <h1>Hi, {user?.name || "Student"} 👋</h1>
            <p>
              Continue materials you have taken, monitor completion status, and
              track your personal learning progress.
            </p>

            <div className="hero-meta">
              <span>{user?.grade || "Grade 12"}</span>
              <span>{user?.school || "Your School"}</span>
            </div>

            <div className="dashboard-progress-card">
              <div className="dashboard-progress-text">
                <span>Cabinet Progress</span>
                <strong>{cabinetProgressPercent}%</strong>
              </div>
              <div className="dashboard-progress-track">
                <div
                  className="dashboard-progress-fill"
                  style={{ width: `${cabinetProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{cabinetMaterials.length}</strong>
              <span>My Materials</span>
            </div>
            <div>
              <strong>{completedCount}</strong>
              <span>Completed</span>
            </div>
            <div>
              <strong>{totalLearningMinutes}</strong>
              <span>Minutes</span>
            </div>
          </div>
        </section>

        <AIStudyAssistant />
        {successMessage && (
          <div className="dashboard-toast">
            <span>✓</span>
            <p>{successMessage}</p>
          </div>
        )}

        {error && (
          <section className="state-card error-state">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchDashboardData}
            >
              Try Again
            </button>
          </section>
        )}

        <section className="dashboard-section" ref={cabinetSectionRef}>
          <div className="dashboard-section-header">
            <div className="dashboard-section-header">
              <div>
                <span className="eyebrow">My Cabinet</span>
                <h2>Your enrolled learning materials</h2>
                <p>
                  Materials in this section are connected to your personal
                  progress.
                </p>
              </div>
            </div>
          </div>

          {isLoading && (
            <section className="materials-grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="material-card skeleton" key={index}>
                  <div />
                  <div />
                  <div />
                </div>
              ))}
            </section>
          )}

          {!isLoading && !error && cabinetMaterials.length === 0 && (
            <section className="state-card cabinet-empty-state">
              <h3>Your learning cabinet is still empty</h3>
              <p>
                Start by exploring available materials below. Add materials to
                your cabinet from the Explore Materials section below.
              </p>
            </section>
          )}

          {!isLoading && !error && cabinetMaterials.length > 0 && (
            <section className="materials-grid">
              {cabinetMaterials.map((material) =>
                renderMaterialCard(material, { isCabinetCard: true }),
              )}
            </section>
          )}
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header dashboard-section-header-split">
            <div>
              <span className="eyebrow">Explore Materials</span>
              <h2>Find new materials to study</h2>
              <p>
                Browse available materials and add them to your personal
                learning cabinet.
              </p>
            </div>
          </div>

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

          {!isLoading && !error && filteredExploreMaterials.length === 0 && (
            <section className="state-card">
              <h3>No available materials found</h3>
              <p>
                Try changing the keyword or subject filter. Materials already in
                your cabinet are hidden from this section.
              </p>
            </section>
          )}

          {!isLoading && !error && filteredExploreMaterials.length > 0 && (
            <section className="materials-grid">
              {filteredExploreMaterials.map((material) =>
                renderMaterialCard(material),
              )}
            </section>
          )}
        </section>
      </main>
    </>
  );
}
