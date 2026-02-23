import React,{useState} from 'react';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TasksSection from '../components/dashboard Components/TasksSection';
import TeamTasks from '../components/TeamTasks';
const Tasks = () => {
  const [activeTab, setActiveTab] = useState("myTasks");
  return (
    <div>
        <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        <div className="border-b border-gray-200 bg-taupe-800/88">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("myTasks")}
              className={`w-1/2 py-3 text-center border-b-2 font-medium text-sm transition ${
                activeTab === "myTasks"
                  ? "text-indigo-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setActiveTab("teamTasks")}
              className={`w-1/2 py-3 text-center border-b-2 font-medium text-sm transition ${
                activeTab === "teamTasks"
                  ? "text-indigo-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Team Tasks
            </button>
          </nav>
        </div>
        <div className="px-4">
          {activeTab === "myTasks" && (
        <TasksSection tasksPerPage={10}/>
          )}
          {activeTab === "teamTasks" && (
            <TeamTasks/>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};


export default Tasks;