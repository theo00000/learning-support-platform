import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { LogIn, Book } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", formData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login Gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
      {/* Bagian Atas: Logo & Judul */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6366F1] rounded-full mb-6 shadow-md">
          <Book className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
          Learning Support Platform
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Platform Belajar Siswa SMA Kelas 12
        </p>
      </div>

      {/* Card Login */}
      <div className="w-full max-w-[500px] bg-card rounded-[2rem] border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
        <div className="flex items-center space-x-2 mb-2">
          <LogIn className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-bold text-foreground">Login</h2>
        </div>
        <p className="text-muted-foreground mb-8 font-medium">
          Masuk ke akun Anda untuk mengakses materi
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Field Email */}
          <div className="space-y-2">
            <label className="text-base font-bold text-foreground ml-1">
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

          {/* Field Password */}
          <div className="space-y-2">
            <label className="text-base font-bold text-foreground ml-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Masukkan password"
              className="w-full px-5 py-4 bg-input-background border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg active:scale-[0.99] disabled:bg-muted mt-2 text-lg"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground font-medium">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-[#6366F1] hover:underline font-bold"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
