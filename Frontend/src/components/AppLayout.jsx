import React, { useState } from "react";
import SideBar from "./SideBar";
import TaskDetailsCard from "../features/tasks/TaskDetailsCard";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [showTaskPopup, setShowTaskPopup] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        <SideBar onOpenTask={() => setShowTaskPopup(true)} />

        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>

      {showTaskPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <TaskDetailsCard
              task={{ title: "", list: "Today", description: "" }}
              onClose={() => setShowTaskPopup(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AppLayout;
