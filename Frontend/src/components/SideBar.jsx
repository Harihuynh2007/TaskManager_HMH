import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChevronDown,
  FaHome,
  FaTasks,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";


function SideBar(onOpenTask) {
  const [expandDashboard, setExpandDashboard] = useState(true);

  const navItem = "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all duration-300 ease-in-out";
  const navActive = "bg-white/50 font-semibold text-indigo-900 shadow-sm";
  const navHover = "hover:bg-white/30 hover:translate-x-1 text-indigo-800";

  return (
    <aside className="w-72 min-h-screen bg-white/20 backdrop-blur-md text-black p-5 flex flex-col rounded-r-3xl shadow-xl">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow" />
        <div>
          <p className="text-xs text-indigo-600 uppercase font-semibold">Product Designer</p>
          <p className="font-bold text-indigo-900">Andrew Smith</p>
        </div>
      </div>

      {/* MAIN Section */}
      <div className="text-xs   mb-2 font-semibold tracking-wide">MAIN</div>
      <div className="space-y-1">
        {/* Dashboard Expandable */}
        <div>
          <button
            onClick={() => setExpandDashboard(!expandDashboard)}
            className={`${navItem} ${navHover} w-full  text-gray-500 hover:bg-blue-600 hover:text-white `}
          >
            <span className="flex items-center gap-2 text-lg font-bold ">
              <FaHome className="transition-all duration-200 " /> Dashboard
            </span>
            <FaChevronDown
              className={`transition-transform duration-300 ${expandDashboard ? "rotate-180" : ""}`}
              size={12}
            />
          </button>
          {expandDashboard && (
            <div className="ml-10 pl-3 border-l font-semibold border-blue-300 space-y-1">
                {["Activity", "Traffic", "Statistic"].map((label) => (
                <div
                    key={label}
                    className="relative pl-4 text-sm text-gray-700 hover:text-blue-700 hover:font-medium cursor-pointer transition"
                >
                    <span className="absolute left-0 top-1/2 w-3 h-px bg-indigo-400"></span>
                    {label}
                </div>
                ))}
            </div>
            )}

            
        </div>

        <NavLink to="/tasks" className={({ isActive }) => `${navItem} ${isActive ? navActive : navHover}   w-full bg-white text-gray-500 hover:bg-blue-600 hover:text-white`}>
          <span className="flex items-center gap-2 text-lg font-bold ">
            <FaTasks /> Tasks
          </span>
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => `${navItem} ${isActive ? navActive : navHover} w-full bg-white text-gray-500 hover:bg-blue-600 hover:text-white  `}>
          <span className="flex items-center gap-2 text-lg font-bold ">
            <FaCalendarAlt /> Calendar
          </span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `${navItem} ${isActive ? navActive : navHover}   w-full bg-white text-gray-500  hover:bg-blue-600 hover:text-white  `}>
          <span className="flex items-center gap-2 text-lg font-bold ">
            <FaCog /> Settings
          </span>
        </NavLink>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="bg-white/50 p-4 rounded-xl text-center text-sm mt-6 shadow-inner">
        <p className="text-indigo-900 font-semibold mb-1">Let’s start!</p>
        <p className="text-xs text-indigo-700 mb-4">Creating tasks is quick and easy</p>
        <button
          onClick={() => onOpenTask && onOpenTask()}
          className="w-full bg-blue-500 hover:bg-white text-white hover:text-blue-600 py-2 rounded-lg font-semibold shadow transition-all duration-300 hover:scale-105"
        >
          + Add New Task
        </button>
      </div>


      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="mt-6 flex items-center gap-3 px-4 py-2 bg-black-500 hover:bg-red-600 rounded-lg text-sm text-black hover:text-white font-semibold shadow transition hover:scale-105"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}

export default SideBar;
