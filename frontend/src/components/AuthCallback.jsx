import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthCallback() {
  const navigate = useNavigate();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    // Session cookie is already set by backend
    // Just trigger auth check and redirect
    handleAuthCallback();
    
    // Small delay to let the auth check complete
    setTimeout(() => {
      navigate("/products?cat=Men");
    }, 500);
  }, [navigate, handleAuthCallback]);

  return (
    <div className="auth-callback-container">
      <h2>Logging you in...</h2>
    </div>
  );
}

export default AuthCallback;