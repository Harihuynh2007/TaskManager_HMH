import React from "react";

function DashboardPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Welcome back 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Tasks Today</h2>
          <p className="text-3xl font-bold text-indigo-600">5</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Completed</h2>
          <p className="text-3xl font-bold text-green-500">12</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">3</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
