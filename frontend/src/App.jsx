import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CompanyDashboard from "./pages/CompanyDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* COMPANY ROUTES */}
          <Route
            path="/company"
            element={
              <ProtectedRoute role="COMPANY">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/new-post"
            element={
              <ProtectedRoute role="COMPANY">
                <NewPost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/edit/:id"
            element={
              <ProtectedRoute role="COMPANY">
                <EditPost />
              </ProtectedRoute>
            }
          />

          {/* JOBSEEKER ROUTES */}
          <Route
            path="/jobseeker"
            element={
              <ProtectedRoute role="JOBSEEKER">
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ROOT REDIRECT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
