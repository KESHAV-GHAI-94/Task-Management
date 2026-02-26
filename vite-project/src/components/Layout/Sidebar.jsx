import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns,
  LogOut,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/user/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="w-64 h-full  bg-taupe-800 text-taupe-100 flex flex-col border-r border-taupe-800">
      <div className="px-5 py-6 border-b border-taupe-800">
        <h1 className="text-xl font-semibold text-taupe-50">
          Quick Task Manager
        </h1>
      </div>
      <div className="flex-1 px-3 py-4 space-y-4">
        <Link
          to="/dashboard"
          onClick={closeSidebar}
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
          Tasks
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
      </div>
      <div className="px-3 py-3 border-t border-taupe-800 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm
          text-red-300 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
        <div className="px-4 py-4 border-t border-taupe-700 ">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-taupe-500 flex items-center justify-center text-white font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                {user?.name || "Guest"}
              </span>
              <span className="text-xs text-gray-400">
                {user?.email || "guest@example.com"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
