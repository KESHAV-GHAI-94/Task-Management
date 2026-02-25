import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Clock } from "lucide-react";

const Navbar = ({ onCreateGroup }) => {
  const location = useLocation();
  const [desktopTime, setDesktopTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDesktopTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const getTitle = () => {
    if (location.pathname.startsWith("/groups")) return "Groups";
    if (location.pathname.startsWith("/tasks")) return "Tasks";
    if (location.pathname.startsWith("/kanban")) return "Kanban";
    if (location.pathname.startsWith("/settings")) return "Settings";
    return "Dashboard";
  };
  return (
    <div className="bg-taupe-100 border-b border-taupe-200 px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center shadow-sm">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-taupe-800">
        {getTitle()}
      </h1>
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="flex items-center gap-2">
          <Clock size={18} className="hidden sm:block" />
          <div className="bg-taupe-300 px-3 py-1 rounded-xl text-sm hidden sm:block">
            {desktopTime}
          </div>
        </div>
        <div className="flex gap-2">
          {location.pathname === "/groups" && (
            <button
              onClick={onCreateGroup}
              className="bg-taupe-500 hover:bg-taupe-600 text-white px-2 sm:px-4 py-1 rounded-lg text-xs sm:text-sm transition"
            >
              <span className="hidden sm:inline">+ Create Group</span>
              <span className="sm:hidden">+ Group</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;