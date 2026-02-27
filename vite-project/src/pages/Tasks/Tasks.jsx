import {useState} from 'react';
import TasksSection from '../../components/dashboard Components/TasksSection';
import TeamTasks from '../../components/Task/TeamTasks';
const Tasks = () => {
  const [activeTab, setActiveTab] = useState("myTasks");
  return (
    <div className="bg-gray-50">
        <div className="border-b  border-gray-200 bg-taupe-800/88">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("myTasks")}
              className={`w-1/2 py-2 md:py-3 cursor-pointer text-center border-b-2 font-medium text-xs md:text-sm transition ${
                activeTab === "myTasks"
                  ? "text-taupe-400"
                  : "border-transparent text-gray-100 hover:text-white"
              }`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setActiveTab("teamTasks")}
              className={`w-1/2 py-2 md:py-3 cursor-pointer text-center border-b-2 font-medium text-xs md:text-sm transition ${
                activeTab === "teamTasks"
                  ? "text-taupe-400"
                  : "border-transparent text-gray-100 hover:text-white"
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
  );
};


export default Tasks;