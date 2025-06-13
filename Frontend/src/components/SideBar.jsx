import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaChevronDown,
  FaTasks,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';


// Define main menu structure
const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: FaHome,
    subMenu: [
      { to: '/dashboard/activity', label: 'Activity' },
      { to: '/dashboard/overview', label: 'Overview' },
      { to: '/dashboard/settings', label: 'Settings' },
    ],
  },
  { key: 'tasks', to: '/tasks', label: 'Tasks', icon: FaTasks },
  { key: 'calendar', to: '/calendar', label: 'Calendar', icon: FaCalendarAlt },
  { key: 'settings', to: '/settings', label: 'Settings', icon: FaCog },
];

// Reusable nav item
function NavItem({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => [
        'flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200',
        isActive
          ? 'bg-white/50 text-indigo-900 font-semibold shadow-sm'
          : 'text-gray-700 hover:bg-white/30 hover:text-indigo-800',
      ].join(' ')}
    >
      <Icon className="text-lg" />
      <span className="font-medium">{label}</span>
    </NavLink>
  
  );
}

export default function SideBar({ onOpenTask, userProfile }) {
  const [openSection, setOpenSection] = useState('dashboard');

  return (
    <aside className="w-72 flex flex-col bg-white/20 backdrop-blur-lg text-indigo-900 p-6 rounded-r-3xl shadow-md">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={userProfile.avatarUrl || "/avatar.jpg"}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-white shadow"
        />
        <div>
          <p className="text-xs uppercase font-semibold">
            {userProfile.profession || "Product Designer"}
          </p>
          <p className="font-bold">
            {userProfile.fullName || "Andrew Smith"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="text-xs uppercase font-semibold tracking-wide mb-2">Main</div>
        <div className="space-y-1">
          {menuItems.map(item =>
            item.subMenu ? (
              <div key={item.key}>
                <button
                  onClick={() => setOpenSection(prev => prev === item.key ? '' : item.key)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="text-lg" /> {item.label}
                  </span>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${openSection === item.key ? '-rotate-180' : 'rotate-0'}`}
                  />
                </button>
                {openSection === item.key && (
                  <div className="ml-8 space-y-1 border-l border-indigo-300 pl-2">
                    {item.subMenu.map(sub => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) => [
                          'block px-2 py-1 text-sm rounded-md transition-colors',
                          isActive
                            ? 'bg-white/50 text-indigo-900 font-semibold'
                            : 'text-gray-700 hover:bg-white/30 hover:text-indigo-800',
                        ].join(' ')}
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavItem key={item.key} to={item.to} label={item.label} Icon={item.icon} />
            )
          )}
        </div>
      </nav>

      {/* Footer (preserved) */}
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
