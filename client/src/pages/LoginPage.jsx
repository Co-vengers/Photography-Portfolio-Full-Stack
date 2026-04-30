import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (form) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AuthForm
        title="Welcome back"
        subtitle="Login to manage bookings and favorites."
        fields={[
          { name: "email", type: "email", placeholder: "Email address" },
          { name: "password", type: "password", placeholder: "Password" }
        ]}
        onSubmit={handleSubmit}
        submitLabel="Login"
        error={error}
        loading={loading}
      />
      <p className="text-center text-sm text-slate-400">
        Need an account?{" "}
        <Link to="/signup" className="text-accent">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
