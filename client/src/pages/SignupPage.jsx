import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AuthForm
        title="Create account"
        subtitle="Save favorites, track bookings, and access your dashboard."
        fields={[
          { name: "name", type: "text", placeholder: "Full name" },
          { name: "email", type: "email", placeholder: "Email address" },
          { name: "password", type: "password", placeholder: "Password" }
        ]}
        onSubmit={handleSubmit}
        submitLabel="Sign up"
        error={error}
        loading={loading}
      />
      <p className="text-center text-sm text-slate-400">
        Already registered?{" "}
        <Link to="/login" className="text-accent">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
