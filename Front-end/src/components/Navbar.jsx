import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">
        <span className="brand-icon">LS</span>
        <span>
          <strong>Learning Support</strong>
          <small>Student Platform</small>
        </span>
      </Link>

      <div className="nav-user">
        <div className="user-mini">
          <span>{user?.name || "Student"}</span>
          <small>{user?.grade || "Grade 12"}</small>
        </div>

        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
