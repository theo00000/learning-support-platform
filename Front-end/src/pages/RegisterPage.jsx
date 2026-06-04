import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const gradeOptions = ["Grade 10", "Grade 11", "Grade 12"];

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    grade: "Grade 12",
    school: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.grade ||
      !form.school
    ) {
      return "All fields are required.";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
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

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        grade: form.grade,
        school: form.school,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Register failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-wide">
        <div className="auth-copy">
          <span className="eyebrow">Start learning</span>
          <h1>Create your student account.</h1>
          <p>
            Build a structured learning habit with materials organized by
            subject, difficulty, and study goals.
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Register</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <label>
            Full Name
            <input
              name="name"
              type="text"
              placeholder="Wesly Rismahadi"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </label>

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
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </label>

          <label>
            Grade
            <select name="grade" value={form.grade} onChange={handleChange}>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </label>

          <label>
            School
            <input
              name="school"
              type="text"
              placeholder="Your school name"
              value={form.school}
              onChange={handleChange}
            />
          </label>

          <button className="btn btn-primary full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="form-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
