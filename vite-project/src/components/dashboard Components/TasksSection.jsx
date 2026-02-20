import React, { useState,useEffect } from 'react';
import axios from "axios";
import {ChevronLeft,ChevronRight} from "lucide-react";
const TasksSection = () => {
    const [tasks,setTasks]= useState([]);
  const [currentTaskPage, setCurrentTaskPage] = useState(0);
  const tasksPerPage= 3;
  const totalTaskPages = Math.ceil(tasks.length/tasksPerPage);
  const visibleTasks = tasks.slice(
    currentTaskPage*tasksPerPage,
    currentTaskPage*tasksPerPage+tasksPerPage,
  )

const fetchTasks= async()=>{
    const res = await axios.post("http://localhost:4000/user/groups/tasks",
        {},
        {
            withCredentials:true,
        })
    setTasks(res.data.tasks);
}
useEffect(()=>{
    fetchTasks();
})

  return (
    <div className="bg-white rounded-xl shadow-sm md:p-2 sm:p-5 mt-4">
  <div className="flex justify-between p-3 lg:py-0  items-center ">
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
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() =>
            setCurrentTaskPage((prev) =>
              Math.min(prev + 1, totalTaskPages - 1)
            )
          }
          disabled={currentTaskPage === totalTaskPages - 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    )}
  </div>

{/* desktop */}
  <div className="hidden md:block px-4 overflow-x-auto">
    <table className="w-full  border-collapse">
      <thead>
        <tr className="text-gray-500 text-sm border-b border-taupe-500">
          <th className="text-left py-3">Title</th>
          <th className="text-left py-3">Group</th>
          <th className="text-left py-3">Role</th>
          <th className="text-center py-3">Status</th>
          <th className="text-center py-3">Priority</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-6 text-gray-400">
              No tasks found
            </td>
          </tr>
        ) : (
          visibleTasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="py-2.5 font-medium">
                {task.title}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  {task.group?.name || "No group"}
                </div>
              </td>
              <td className="py-3">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                  {task.role || "Member"}
                </span>
              </td>
              <td className="py-2.75 text-center">
                <StatusBadge status={task.status} />
              </td>
              <td className="py-3 text-center">
                <PriorityBadge priority={task.priority} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

{/* mobile */}
  <div className="block p-3 pt-3  md:hidden">
    {tasks.length === 0 ? (
      <div className="text-center py-6 text-gray-400">
        No tasks found
      </div>
    ) : (
      <div className="flex flex-col  gap-3">
        {visibleTasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 mt-2 space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Title</span>
              <span className="font-medium text-right">
                {task.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Group</span>
              <span className="flex items-center gap-1">
                {task.group?.name || "No group"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Role</span>
              <span>
                {task.role || "Member"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Status</span>
              <StatusBadge status={task.status} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Priority</span>
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
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`inline-block min-w-auto text-center px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
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
  <span className={`inline-block min-w-auto text-center font-medium text-sm ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default TasksSection;