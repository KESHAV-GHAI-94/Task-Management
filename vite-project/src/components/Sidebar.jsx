import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns,
  Users,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-taupe-800 text-taupe-100 flex flex-col border-r border-taupe-800">

      <div className="px-5 py-6 border-b border-taupe-800">
        <h1 className="text-xl font-semibold text-taupe-50">
          Quick Task Manager
        </h1>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
            ${
              location.pathname === "/dashboard"
                ? "bg-taupe-700 text-white"
                : "text-taupe-300 hover:bg-taupe-800 hover:text-white"
            }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Link
          to="/groups"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
            ${
              location.pathname === "/groups"
                ? "bg-taupe-700 text-white"
                : "text-taupe-300 hover:bg-taupe-800 hover:text-white"
            }`}
        >
          <FolderKanban size={18} />
          Groups
        </Link>
        <Link
          to="/tasks"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
            ${
              location.pathname === "/tasks"
                ? "bg-taupe-700 text-white"
                : "text-taupe-300 hover:bg-taupe-800 hover:text-white"
            }`}
        >
          <CheckSquare size={18} />
          My Tasks
        </Link>
        
        <Link
          to="/kanban"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
            ${
              location.pathname === "/kanban"
                ? "bg-taupe-700 text-white"
                : "text-taupe-300 hover:bg-taupe-800 hover:text-white"
            }`}
        >
          <Columns size={18} />
          Kanban
        </Link>
        <Link
          to="/members"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
            ${
              location.pathname === "/members"
                ? "bg-taupe-700 text-white"
                : "text-taupe-300 hover:bg-taupe-800 hover:text-white"
            }`}
        >
          <Users size={18} />
          Members
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
            ${location.pathname === "/settings"
                ? "bg-taupe-700 text-white"
                : "text-taupe-300 hover:bg-taupe-800 hover:text-white"
            }`}
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
      <div className="px-4 py-4 border-t border-taupe-800 text-xs text-taupe-400">
        Logged in as User
      </div>
    </div>
  );
};

export default Sidebar;