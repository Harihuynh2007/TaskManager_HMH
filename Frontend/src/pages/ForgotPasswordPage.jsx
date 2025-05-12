import React, { useState } from "react";


function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Recovery link sent to ${email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img src="/logo.svg" alt="Logo" className="h-8 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-center mb-1">Can’t log in?</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          We'll send a recovery link to
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
          >
            Send recovery link
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          <a href="/" className="text-indigo-600 hover:underline">
            Return to log in
          </a>
        </p>

        <hr className="my-6" />

        <div className="text-center text-xs text-gray-500">
          <strong>HMH Co.op</strong><br />
          One account for Jira, Confluence and <a href="#" className="underline">more</a><br />
          <a href="#" className="underline">Login help</a> • <a href="#" className="underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
