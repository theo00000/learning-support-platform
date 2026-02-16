import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import {
  GraduationCap,
  LogOut,
  Search,
  BookOpen,
  Clock,
  Target,
  User,
  LayoutDashboard,
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Ambil user dari Context
  const [materials, setMaterials] = useState([]); // Data dari MongoDB
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [loading, setLoading] = useState(true);

  // 1. Ambil data materi dari Backend saat halaman dimuat
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const res = await API.get("/courses"); // Menuju backend port 5000
        setMaterials(res.data);
      } catch (err) {
        console.error("Gagal mengambil materi:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMaterials();
  }, [user]);

  // 2. Logika Filter Mata Pelajaran
  const subjects = ["all", ...new Set(materials.map((m) => m.subject))];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || material.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleLogout = () => {
    logout();
    alert("Berhasil logout");
    navigate("/login");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-700";
      case "Menengah":
        return "bg-amber-100 text-amber-700";
      case "Sulit":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium italic">
          Menyiapkan materi belajarmu...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-gray-900">
                  Learning Support Platform
                </h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 leading-none">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {user?.grade || "Kelas 12"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Hero */}
        <div className="relative overflow-hidden bg-[#0F172A] rounded-[2.5rem] p-8 md:p-12 mb-12 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Siap Taklukkan <span className="text-blue-400">Ujian Akhir</span>,{" "}
              {user?.name?.split(" ")[0]}?
            </h2>
            <p className="text-gray-400 text-lg mb-8 font-medium">
              Kamu terdaftar sebagai siswa{" "}
              <span className="text-white">{user?.school}</span>. Mari mulai
              eksplorasi materi hari ini.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-center">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                  Materi
                </p>
                <p className="text-3xl font-black text-blue-400">
                  {materials.length}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-center">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                  Mata Pelajaran
                </p>
                <p className="text-3xl font-black text-purple-400">
                  {subjects.length - 1}
                </p>
              </div>
            </div>
          </div>
          <LayoutDashboard className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  selectedSubject === subject
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                    : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                }`}
              >
                {subject === "all" ? "Semua Materi" : subject}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Cari topik spesifik..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-4xl border-2 border-dashed border-gray-100">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">
              Materi Tidak Ditemukan
            </h3>
            <p className="text-gray-500">
              Coba gunakan kata kunci atau filter lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map((material) => (
              <div
                key={material._id}
                className="group bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      {material.subject}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getDifficultyColor(material.difficulty)}`}
                    >
                      {material.difficulty}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-8">
                    {material.description}
                  </p>
                  <div className="flex items-center text-xs font-bold text-gray-400 space-x-4 pt-6 border-t border-gray-50">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      {material.duration}
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-500" />
                      {material.topics?.length || 0} Topik
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <Link
                    to={`/material/${material._id}`}
                    className="flex items-center justify-center w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-gray-200"
                  >
                    Buka Materi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
