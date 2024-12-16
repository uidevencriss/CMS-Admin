import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";

const LoginPage = () => {
    const [error, setError] = useState("");
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login(email, password);
      console.log("data",data);
      if (data.success === false) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }
      
      localStorage.setItem("authToken", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleSignup = () => {
    // Redirect to signup page
    window.location.href = "/signup";
  };

  return (
    <div>
      
      <LoginForm handleSubmit={handleLogin} onSignup={handleSignup} error={error}/>
    </div>
  );
};

export default LoginPage;
