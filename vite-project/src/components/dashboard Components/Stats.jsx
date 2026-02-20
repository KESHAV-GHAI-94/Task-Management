import React,{useState,useEffect} from "react";
import axios from "axios";
import {ListTodo,Clock,Activity,CheckCircle2} from "lucide-react"
const Stats = () => {
const [stats, setStats] = useState({});
 const fetchStats = async () => {
  const res = await axios.get("http://localhost:4000/admin/dashboard", {
    withCredentials: true,
  });
  setStats(res.data);
};
  useEffect(() => {
      fetchStats()
    }, []);
    
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4">
            <StatCard
              title="Total Tasks"
              value={stats.totalAssigned}
              icon={<ListTodo size={20} />}
              color="bg-blue-500"
            />
            <StatCard
              title="Todo"
              value={stats.todo}
              icon={<Clock size={20} />}
              color="bg-yellow-500"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              icon={<Activity size={20} />}
              color="bg-purple-500"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              icon={<CheckCircle2 size={20} />}
              color="bg-green-500"
            />
          </div>
    </div>
  );
};
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 flex justify-between items-center hover:shadow-md transition">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl sm:text-2xl font-bold mt-1">{value || 0}</h2>
    </div>
    <div className={`${color} text-white p-2 sm:p-3 rounded-lg`}>{icon}</div>
  </div>
);

export default Stats;