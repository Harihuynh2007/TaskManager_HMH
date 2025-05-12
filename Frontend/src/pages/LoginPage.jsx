import AuthForm from "../components/AuthForm";
import React from "react";
function LoginPage() {
  return <AuthForm mode="login" baseUrl="http://127.0.0.1:8000" />;
}

export default LoginPage;
