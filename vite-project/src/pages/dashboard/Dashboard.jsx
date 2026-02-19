import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  ListTodo,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentGroupPage, setCurrentGroupPage] = useState(0);
  const [currentTaskPage, setCurrentTaskPage] = useState(0);

  const tasksPerPage = 3;

  const totalTaskPages = Math.ceil(tasks.length / tasksPerPage);

  const visibleTasks = tasks.slice(
    currentTaskPage * tasksPerPage,
    currentTaskPage * tasksPerPage + tasksPerPage,
  );

  const groupsPerPage = 3;
  const totalGroupPages = Math.ceil(groups.length / groupsPerPage);
  const visibleGroups = groups.slice(
    currentGroupPage * groupsPerPage,
    currentGroupPage * groupsPerPage + groupsPerPage,
  );

  useEffect(() => {
    fetchStats();
    fetchGroups();
    fetchTasks();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:4000/admin/dashboard", {
      withCredentials: true,
    });
    setStats(res.data);
  };

  const fetchGroups = async () => {
    const res = await axios.get("http://localhost:4000/user/groups", {
      withCredentials: true,
    });
    setGroups(res.data.groups);
  };

  const fetchTasks = async () => {
    const res = await axios.post(
      "http://localhost:4000/user/groups/tasks",
      {},
      { withCredentials: true },
    );
    setTasks(res.data.tasks);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        <div className="p-4 lg:py-2">
          {/* stats card */}
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4 sm:gap-6
            mb-4
          "
          >
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

          {/* groups & kanban & productivity */}
          <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          "
          >
            {/* Groups */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between pe-1 mb-2">
                <div className="flex items-center gap-2">
                  <FolderKanban className="text-blue-500" size={20} />
                  <h2 className="font-semibold text-lg text-gray-800">
                    Groups
                  </h2>
                </div>
                {groups.length > groupsPerPage && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentGroupPage((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentGroupPage === 0}
                      className="
            flex items-center justify-center
            w-8 h-8
            rounded-md
            border
            border-gray-200
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition
          "
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    <button
                      onClick={() =>
                        setCurrentGroupPage((prev) =>
                          Math.min(prev + 1, totalGroupPages - 1),
                        )
                      }
                      disabled={currentGroupPage === totalGroupPages - 1}
                      className="
            flex items-center justify-center
            w-8 h-8
            rounded-md
            border
            border-gray-200
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition
          "
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
              {/* Groups list */}
              {groups.length === 0 ? (
                <p className="text-gray-400 text-sm">No groups found</p>
              ) : (
                <div className="">
                  {visibleGroups.map((group) => (
                    <div
                      key={group.id}
                      className="
            flex items-center justify-between
            p-3
            rounded-lg
            hover:bg-blue-50
            cursor-pointer
            transition
            group
          "
                    >
                      <span
                        className="
            font-medium
            text-sm sm:text-base
            text-gray-800
            group-hover:text-blue-600
          "
                      >
                        {group.name}
                      </span>
                      <span
                        className="
            text-xs sm:text-sm
            text-gray-400
            bg-gray-100
            px-2 py-0.5
            rounded
          "
                      >
                        {group.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="
  bg-linear-to-r
  from-orange-400
  to-yellow-400
  text-white
  rounded-xl
  shadow-sm
  p-10
  lg:p-16
  cursor-pointer
  hover:shadow-md
  transition
"
            >
              <div className="flex items-center  justify-between">
                <div>
                  <h2 className="font-semibold text-lg">Kanban Board</h2>
                  <p className="text-sm opacity-90">
                    View and manage your tasks visually
                  </p>
                </div>
                {/* Kanban icon */}
                <div className="flex gap-1">
                  <div className="w-2 h-6 bg-white/80 rounded"></div>
                  <div className="w-2 h-4 bg-white/80 rounded"></div>
                  <div className="w-2 h-5 bg-white/80 rounded"></div>
                </div>
              </div>
              {/* Button */}
              <div className="mt-4">
                <button
                  className="
        bg-white
        text-orange-600
        px-4 py-1.5
        rounded-md
        text-sm
        font-medium
        hover:bg-orange-50
        transition
      "
                >
                  Go to Kanban →
                </button>
              </div>
            </div>
            {/* Productivity */}
            <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-sm p-5 lg:p-16">
              <h2 className="font-semibold text-lg mb-2">Productivity</h2>
              <p className="text-sm opacity-90">
                Completed {stats.completed || 0} tasks
              </p>
              <div className="mt-4">
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full"
                    style={{
                      width: `${
                        stats.totalAssigned
                          ? (stats.completed / stats.totalAssigned) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3 items-center">
                <h2 className="font-semibold text-lg">My Tasks</h2>
                <span className="rounded-xl bg-zinc-200 px-2 text-gray-500 text-sm">
                  Total: {tasks.length}
                </span>
              </div>
              {tasks.length > tasksPerPage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentTaskPage((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={currentTaskPage === 0}
                    className="
          flex items-center justify-center
            w-8 h-8
            rounded-md
            border
            border-gray-200
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition
        "
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentTaskPage((prev) =>
                        Math.min(prev + 1, totalTaskPages - 1),
                      )
                    }
                    disabled={currentTaskPage === totalTaskPages - 1}
                    className="
          flex items-center justify-center
            w-8 h-8
            rounded-md
            border
            border-gray-200
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition
        "
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                {/* Header */}
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="text-left py-3 w-[30%]">Title</th>
                    <th className="text-left py-3 w-[25%]">Group</th>
                    <th className="text-left py-3 w-[15%]">Role</th>
                    <th className="text-center py-3 w-[15%]">Status</th>
                    <th className="text-center py-3 w-[15%]">Priority</th>
                  </tr>
                </thead>
                {/* Body */}
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400"
                      >
                        No tasks found
                      </td>
                    </tr>
                  ) : (
                    visibleTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* Title */}
                        <td className="py-3 font-medium text-gray-800">
                          {task.title}
                        </td>
                        {/* Group */}
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <FolderKanban size={14} className="text-blue-500" />
                            <span className="text-sm font-medium">
                              {task.group?.name || "No group"}
                            </span>
                          </div>
                        </td>
                        {/* Role */}
                        <td className="py-3">
                          <span
                            className="
                  text-xs
                  bg-gray-100
                  text-gray-600
                  px-2 py-1
                  rounded-md
                  font-medium
                "
                          >
                            {task.role || "Member"}
                          </span>
                        </td>
                        {/* Status */}
                        <td className="py-3 text-center">
                          <StatusBadge status={task.status} />
                        </td>
                        {/* Priority */}
                        <td className="py-3 text-center">
                          <PriorityBadge priority={task.priority} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

const StatusBadge = ({ status }) => {
  const colors = {
    todo: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`
      inline-block
      min-w-auto
      text-center
      px-3 py-1
      rounded-full
      text-xs font-medium
      ${colors[status]}
    `}
    >
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-green-600",
  };
  return (
    <span
      className={`
      inline-block
      min-w-auto
      text-center
      font-medium text-sm
      ${colors[priority]}
    `}
    >
      {priority}
    </span>
  );
};

export default Dashboard;
