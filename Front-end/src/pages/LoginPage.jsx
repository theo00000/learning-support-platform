import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  const validateForm = () => {
    const email = form.email.toLowerCase().trim();

    if (!email || !form.password) {
      return "Email and password are required.";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationMessage = validateForm();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Invalid email or password.",
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
            Access your personal learning cabinet, continue materials you have
            taken, and track your study progress.
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
