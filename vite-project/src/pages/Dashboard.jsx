import React,{useState,useEffect} from "react";
import Api from "../Api"
import Stats from "../components/dashboard Components/Stats";
import Groupsection from "../components/dashboard Components/Groupsection";
import KanbanViewSection from "../components/dashboard Components/KanbanViewSection";
import Progressbar from "../components/dashboard Components/Progressbar";
import TasksSection from "../components/dashboard Components/TasksSection";
const Dashboard = () => {
const [stats, setStats] = useState({});
const fetchStats = async () => {
  const res = await Api.get("/admin/dashboard",{
    withCredentials: true,
    headers: {
        "Cache-Control": "no-cache"
      }
  });
  setStats(res.data);
};
  useEffect(() => {
      fetchStats()
    }, []);
  return (
        <div className="p-4 lg:pt-0">
          <h3 className="m-2 text-xl font-semibold text-taupe-800">
            Stats View
          </h3>
          <Stats stats={stats}/>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Groupsection />
            <KanbanViewSection />
            <Progressbar stats={stats}/>
          </div>
          <TasksSection tasksPerPage={3}/>
        </div>
  );
};

export default Dashboard;
