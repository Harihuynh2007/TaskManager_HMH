import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function ModernAuthForm({ mode, baseUrl }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLogin = mode === "login";

  const schema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Please enter email !"),
    password: yup.string().min(6, "Password at least 6 characters !").required("Vui lòng nhập mật khẩu"),
    confirmPassword: isLogin
      ? yup.string().nullable()
      : yup
          .string()
          .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
          .required("Vui lòng nhập lại mật khẩu"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/accounts/login/" : "/api/accounts/register/";
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Auth failed");

      if (isLogin) {
        localStorage.setItem("access_token", result.access);
        localStorage.setItem("refresh_token", result.refresh);
        navigate("/dashboard");
      } else {
        alert("✅ Account created. Please log in.");
        navigate("/");
      }
    } catch (err) {
      alert("❌ Authentication failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white px-8 py-10">
          <img src="/public/loginregister.png" alt="Illustration" className="mb-6" />
          <h2 className="text-2xl font-bold text-center text-indigo-600">Welcome to TaskManager</h2>
          <p className="text-sm text-center text-gray-600 mt-2">
            Sign up to manage your tasks effectively.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-[480px] max-w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {isLogin ? "Login to your Account" : "Create an Account"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isLogin ? "See what's going on with your business" : "Start your journey with us today."}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 pr-10"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                {isLogin && <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>}
                <span
                  className="text-indigo-600 hover:underline cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? (isLogin ? "Logging in..." : "Creating...") : isLogin ? "Login" : "Sign up"}
              </button>
            </form>

            {isLogin && (
              <>
                <div className="text-center text-sm text-gray-500 mt-6 mb-2">or continue with</div>
                <div className="flex justify-center gap-3">
                  <button className="bg-white border border-gray-300 rounded-md p-2 hover:shadow-md transition">
                    <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
                  </button>
                  <button className="bg-white border border-gray-300 rounded-md p-2 hover:shadow-md transition">
                    <img src="https://img.icons8.com/ios-glyphs/24/000000/github.png" alt="GitHub" />
                  </button>
                  <button className="bg-white border border-gray-300 rounded-md p-2 hover:shadow-md transition">
                    <img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" />
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-xs text-gray-600 mt-4">
              {isLogin ? "Not registered yet? " : "Already have an account? "}
              <span
                className="text-indigo-600 cursor-pointer hover:underline"
                onClick={() => navigate(isLogin ? "/register" : "/")}
              >
                {isLogin ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernAuthForm;
