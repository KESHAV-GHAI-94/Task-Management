import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TeamTasks = () => {
  const [groups, setGroups] = useState([]);
  const fetchGroupwiseTasks = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/user/groups/groupwise/tasks",
        {},
        { withCredentials: true },
      );
      setGroups(res.data.groups || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };
  useEffect(() => {
    fetchGroupwiseTasks();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm md:p-2 sm:p-5 mt-4">
      <div className="flex justify-between p-3 items-center">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-lg">Groupwise Team Tasks</h2>
          <span className="rounded-xl bg-zinc-200 px-2 text-gray-500 text-sm">
            Total: {groups.reduce((total, g) => total + g.tasks.length, 0)}
          </span>
        </div>
      </div>
      {/* destop */}
      <div className="hidden md:block px-4 overflow-x-auto">
        {groups.length === 0 ? (
          <div className="text-center py-6 text-gray-400">No tasks found</div>
        ) : (
          groups
            .filter((groupData) => groupData.tasks.length > 0)
            .map((groupData) => (
              <div
                key={groupData.id}
                className="mb-6 border rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                  <span className="font-semibold">{groupData.name}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {groupData.groupMembers?.[0]?.role}
                  </span>
                </div>
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b text-sm text-gray-600">
                      <th className="text-left py-3 pl-4">Title</th>
                      <th className="text-center py-3">Status</th>
                      <th className="text-center py-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupData.tasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="pl-4 py-3">{task.title}</td>
                        <td className="text-center">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="text-center">
                          <PriorityBadge priority={task.priority} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
        )}
      </div>
      {/* mobilr */}
      <div className="block md:hidden p-3">
        {groups.length === 0 ? (
          <div className="text-center py-6 text-gray-400">No tasks found</div>
        ) : (
          <div className="flex flex-col gap-4">
            {groups
              .filter((groupData) => groupData.tasks.length > 0)
              .map((groupData) => (
                <div key={groupData.id} className="border rounded-lg bg-white">
                  <div className="bg-gray-100 px-4 py-2 flex justify-between">
                    <span className="font-semibold text-sm">
                      {groupData.name}
                    </span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {groupData.groupMembers?.[0]?.role || "Guest"}
                    </span>
                  </div>
                  <div className="p-3 flex flex-col gap-3">
                    {groupData.tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-3">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Title</span>
                          <span className="text-sm font-medium">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Status</span>
                          <StatusBadge status={task.status} />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Priority
                          </span>
                          <PriorityBadge priority={task.priority} />
                        </div>
                      </div>
                    ))}
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
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}
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
      className={`font-medium text-sm ${colors[priority] || "text-gray-600"}`}
    >
      {priority}
    </span>
  );
};
export default TeamTasks;
