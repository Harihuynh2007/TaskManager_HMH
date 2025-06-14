import AuthForm from "../components/navigation/AuthForm";
import React from "react";
function RegisterPage() {
  return <AuthForm mode="register" baseUrl="http://127.0.0.1:8000" />;
}

export default RegisterPage;
