import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isCheckingSession } = useAuth();
  const location = useLocation();

  if (isCheckingSession) {
    return (
      <main className="center-screen">
        <div className="loader-card">
          <div className="spinner" />
          <p>Checking your session...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
