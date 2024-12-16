import React from "react";
import SignupForm from "../components/SignupForm";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
    const navigate = useNavigate();
  const handleSignup = async (formData) => {
    const { name, email, password, firstName, lastName } = formData;

    const body = {
      name,
      email,
      password,
      data: { firstName, lastName },
    };

    try {
      const response = await signup(body);
      console.log("User signed up successfully:", response.data);
      navigate("/dashboard");
      alert("Signup successful!");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed.");
    }
  };

  return <SignupForm handleSignup={handleSignup} />;
};

export default SignupPage;
