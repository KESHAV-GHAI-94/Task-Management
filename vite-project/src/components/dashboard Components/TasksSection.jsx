import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const TasksSection = ({ tasksPerPage }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentTaskPage, setCurrentTaskPage] = useState(0);
  const totalTaskPages = Math.ceil(tasks.length / tasksPerPage);
  const visibleTasks = tasks.slice(
    currentTaskPage * tasksPerPage,
    currentTaskPage * tasksPerPage + tasksPerPage,
  );
  useEffect(() => {
    const fetchTasks = async () => {
    const res = await axios.post(
      "http://localhost:4000/user/groups/tasks",
      {},
      {
        withCredentials: true,
      },
    );
    setTasks(res.data.tasks);
  };
  fetchTasks();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm md:p-2 sm:p-5 mt-3">
      <div className="flex justify-between  p-3  lg:py-0  items-center ">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-base md:text-lg">My Tasks</h2>
          <span className="rounded-xl bg-zinc-200 px-2 text-gray-500 text-xs md:text-sm">
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
              className="h-6 w-6  md:w-8 md:h-8 flex items-center cursor-pointer justify-center rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
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
              className="h-6 w-6  md:w-8 md:h-8 flex cursor-pointer items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:block px-4 mt-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-taupe-200">
                <tr className="text-taupe-500 text-xs   uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium">Group</th>
                  <th className="text-left px-4 py-3 font-medium">Role</th>
                  <th className="text-center px-4 py-3 font-medium">Status</th>
                  <th className="text-center px-4 py-3 font-medium">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-400 text-sm"
                    >
                      No tasks found
                    </td>
                  </tr>
                ) : (
                  visibleTasks.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      className="
                  group
                  cursor-pointer
                  transition
                  hover:bg-blue-50
                "
                    >
                      <td className="px-4 py-3">
                        <span
                          className="
                    font-medium
                    text-gray-800
                    group-hover:text-blue-600
                    transition
                  "
                        >
                          {task.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {task.group?.name || "No group"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="
                    text-xs
                    font-medium
                    bg-gray-100
                    text-gray-600
                    px-2.5
                    py-1
                    rounded-md
                  "
                        >
                          {task.role || "Guest"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="px-4 py-3 text-center">
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
      {/* mobile */}
      <div className="block p-3 md:hidden">
        {tasks.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-400">
            No tasks found
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white shadow-sm active:scale-[0.99] transition"
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Title
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {task.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Group</span>
                  <span className="text-sm font-medium text-gray-700">
                    {task.group?.name || "No group"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Role</span>
                  <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                    {task.role || "Member"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Status</span>
                  <StatusBadge status={task.status} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Priority</span>
                  <PriorityBadge priority={task.priority} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    todo: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[11px] md:text-sm font-medium ${colors[status]}`}
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
    <span className={`text-xs md:text-sm font-semibold capitalize ${colors[priority]}`}>
      {priority}
    </span>
  );
};

export default TasksSection;
