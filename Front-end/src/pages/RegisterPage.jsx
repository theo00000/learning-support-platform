import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { GraduationCap, BookOpen, ChevronDown } from "lucide-react";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    school: "",
  });

  // Gabungkan state error dari kode Karang Taruna
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error setiap kali submit

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      // Menggunakan API.post (Axios) seperti logika yang ingin kamu tambahkan
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        grade: formData.grade,
        school: formData.school,
      });

      // Tambahkan penyimpanan token ke localStorage seperti di kode Karang Taruna
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Registrasi Berhasil!");
      navigate("/login"); // Atau navigate('/home') sesuai keinginanmu
    } catch (err) {
      // Ambil pesan error dari backend
      setError(
        err.response?.data?.msg || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6366F1] rounded-full mb-6 shadow-md">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
          Learning Support Platform
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Daftar Akun Siswa SMA Kelas 12
        </p>
      </div>

      {/* Card Register */}
      <div className="w-full max-w-[600px] bg-card rounded-[2rem] border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
        <div className="flex items-center space-x-2 mb-2">
          <BookOpen className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-bold text-foreground">Daftar Akun</h2>
        </div>

        {/* Tampilkan Pesan Error jika ada */}
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-xl mb-4 text-sm font-medium border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Baris 1: Nama & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">
                Nama Lengkap
              </label>
              <input
                name="name"
                type="text"
                placeholder="Budi Santoso"
                className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="nama@email.com"
                className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Baris 2: Kelas & Sekolah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">
                Kelas
              </label>
              <div className="relative">
                <select
                  name="grade"
                  className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer text-foreground"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Pilih Kelas
                  </option>
                  <option value="12-IPA">12 IPA</option>
                  <option value="12-IPS">12 IPS</option>
                  <option value="12-Bahasa">12 Bahasa</option>
                </select>
                <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">
                Nama Sekolah
              </label>
              <input
                name="school"
                type="text"
                placeholder="SMA Negeri 1"
                className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                value={formData.school}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Baris 3: Password & Konfirmasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">
                Konfirmasi Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg active:scale-[0.99] disabled:bg-muted mt-4 text-lg"
          >
            {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-6">
          <p className="text-muted-foreground font-medium">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-[#6366F1] hover:underline font-bold"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
