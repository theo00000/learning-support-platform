import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email: form.email,
        password: form.password,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Welcome back</span>
          <h1>Continue your learning journey.</h1>
          <p>
            Access learning materials, organize your study flow, and prepare
            yourself with structured content.
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="student@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </label>

          <button className="btn btn-primary full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="form-footer">
            Don't have an account? <Link to="/register">Create account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
