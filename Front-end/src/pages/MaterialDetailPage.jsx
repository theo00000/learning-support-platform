import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Target,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

export function MaterialDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Mengambil user dari context
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedMaterials, setRelatedMaterials] = useState([]);

  // 1. Ambil data materi spesifik dari MongoDB
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/courses/${id}`);
        setMaterial(res.data);

        // Ambil data materi terkait (opsional: panggil semua materi lalu filter)
        const allRes = await API.get("/courses");
        const related = allRes.data
          .filter(
            (m) => m.subject === res.data.subject && m._id !== res.data._id,
          )
          .slice(0, 3);
        setRelatedMaterials(related);
      } catch (err) {
        console.error("Gagal mengambil detail materi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id, navigate, user]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800";
      case "Menengah":
        return "bg-yellow-100 text-yellow-800";
      case "Sulit":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">
          Memuat materi pembelajaran...
        </p>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Materi tidak ditemukan
          </h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
            </Link>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900 hidden sm:inline">
                Learning Support Platform
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Material Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-8 transition-all hover:shadow-md">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
              {material.subject}
            </span>
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${getDifficultyColor(material.difficulty)}`}
            >
              {material.difficulty}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {material.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
            {material.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="flex items-center text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">Durasi: {material.duration}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">
                {material.topics?.length || 0} topik pembahasan
              </span>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center uppercase tracking-widest text-xs">
              Topik yang Dibahas
            </h3>
            <div className="flex flex-wrap gap-2">
              {material.topics?.map((topic, index) => (
                <span
                  key={index}
                  className="bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-12">
          <div className="prose prose-slate max-w-none">
            {/* Menggunakan whitespace-pre-wrap agar enter/paragraf dari DB terlihat */}
            <div className="whitespace-pre-wrap text-gray-800 leading-8 text-lg">
              {material.content}
            </div>
          </div>
        </div>

        {/* Related Materials Section */}
        {relatedMaterials.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              Materi {material.subject} Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMaterials.map((rm) => (
                <Link
                  key={rm._id}
                  to={`/material/${rm._id}`}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <span
                    className={`self-start px-2 py-0.5 rounded text-[10px] font-bold mb-4 ${getDifficultyColor(rm.difficulty)}`}
                  >
                    {rm.difficulty}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {rm.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6 line-clamp-2">
                    {rm.description}
                  </p>
                  <div className="mt-auto flex items-center text-xs font-bold text-blue-600">
                    BACA MATERI <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-center px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
          >
            <BookOpen className="w-4 h-4 mr-2" /> Baca Ulang
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2026 Learning Support Platform. Persiapan Siswa SMA Kelas 12.
          </p>
        </div>
      </footer>
    </div>
  );
}
