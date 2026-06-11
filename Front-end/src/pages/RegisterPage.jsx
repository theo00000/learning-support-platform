import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const gradeOptions = ["Grade 10", "Grade 11", "Grade 12"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const getPasswordRules = (password) => [
  {
    label: "At least 8 characters",
    isValid: password.length >= 8,
  },
  {
    label: "Uppercase letter",
    isValid: /[A-Z]/.test(password),
  },
  {
    label: "Lowercase letter",
    isValid: /[a-z]/.test(password),
  },
  {
    label: "Number",
    isValid: /\d/.test(password),
  },
  {
    label: "Special character",
    isValid: /[^A-Za-z0-9]/.test(password),
  },
];

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

  const passwordRules = getPasswordRules(form.password);

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
    const name = form.name.trim();
    const email = form.email.toLowerCase().trim();
    const school = form.school.trim();

    if (!name || !email || !form.password || !form.grade || !school) {
      return "All fields are required.";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!strongPasswordRegex.test(form.password)) {
      return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
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
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        grade: form.grade,
        school: form.school.trim(),
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
            Build a personal learning cabinet, continue your materials, and
            track your progress with a safer account.
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
              placeholder="Min. 8 chars, Aa, 123, @"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </label>

          <div className="password-rules">
            {passwordRules.map((rule) => (
              <span
                key={rule.label}
                className={
                  rule.isValid ? "password-rule is-valid" : "password-rule"
                }
              >
                {rule.isValid ? "✓" : "•"} {rule.label}
              </span>
            ))}
          </div>

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
