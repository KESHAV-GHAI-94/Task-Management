import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Stats from "../components/dashboard Components/Stats";
import Groupsection from "../components/dashboard Components/Groupsection";
import KanbanViewSection from "../components/dashboard Components/KanbanViewSection";
import Progressbar from "../components/dashboard Components/Progressbar";
import TasksSection from "../components/dashboard Components/TasksSection";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        <div className="p-4 lg:pt-0">
          <h3 className="m-2 text-xl font-semibold text-taupe-800">
            Stats View
          </h3>
          <Stats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Groupsection />
            <KanbanViewSection />
            <Progressbar />
          </div>
          <TasksSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
