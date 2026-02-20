import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  const PageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/groups":
        return "Groups";
      case "/tasks":
        return "My Tasks";
      case "/kanban":
        return "Kanban";
      case "/members":
        return "Members";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="
      bg-taupe-50
      border-b
      border-taupe-200
      px-6
      py-3
      flex
      justify-between
      items-center
      shadow-sm
    ">

      <h1 className="text-xl sm:text-2xl font-semibold text-taupe-800">
        {PageTitle()}
      </h1>

      <div className="flex gap-3">
        <button className="
          bg-taupe-700
          hover:bg-taupe-800
          text-white
          px-4
          py-1.5
          rounded-lg
          text-sm
          transition
        ">
          + Create Task
        </button>
        <button className="
          bg-taupe-500
          hover:bg-taupe-600
          text-white
          px-4
          py-1.5
          rounded-lg
          text-sm
          transition
        ">
          + Create Group
        </button>
      </div>
    </div>
  );
};

export default Navbar;