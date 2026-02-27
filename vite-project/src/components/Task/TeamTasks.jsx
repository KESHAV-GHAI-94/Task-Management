import { useState, useEffect } from "react";
import Api from "../../Api"
import { useNavigate } from "react-router-dom";
const TeamTasks = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchGroupwiseTasks = async () => {
    try {
      const res = await Api.post("/user/groups/groupwise/tasks",
        {},
        { withCredentials: true },
      );
      setGroups(res.data.groups || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };
    fetchGroupwiseTasks();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm md:p-2 sm:p-5 mt-4">
      <div className="flex justify-between p-3 items-center">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-sm md:text-lg">Groupwise Team Tasks</h2>
          <span className="rounded-xl bg-zinc-200 px-2 text-gray-500 text-xs md:text-sm">
            Total: {groups.reduce((total, g) => total + g.tasks.length, 0)}
          </span>
        </div>
      </div>

      {/* destop */}
      <div className="hidden md:block px-4 overflow-x-auto">
        {groups.length === 0 ? (
          <div className="text-center py-6 text-taupe-400">No tasks found</div>
        ) : (
          groups
            .filter((groupData) => groupData.tasks.length > 0)
            .map((groupData) => (
              <div
                key={groupData.id}
                className="mb-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="bg-taupe-50 px-4 py-3 flex justify-between items-center">
                  <span className="font-semibold bg-taupe-300 px-4 py-1 rounded-2xl text-gray-700">
                    {groupData.name}
                  </span>
                  <span className="text-sm bg-taupe-300 text-taupe-700 px-3 py-1 rounded-full">
                    {groupData.groupMembers?.[0]?.role}
                  </span>
                </div>
                <table className="w-full table-fixed">
                  <thead className="bg-taupe-200 text-gray-600 text-sm">
                    <tr>
                      <th className="text-left py-3 pl-4 font-medium">Title</th>
                      <th className="text-center py-3 font-medium">Status</th>
                      <th className="text-center py-3 font-medium">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {groupData.tasks.map((task) => (
                      <tr
                        key={task.id}
                        onClick={() => navigate(`/tasks/${task.id}`)}
                        className="cursor-pointer hover:bg-gray-100 transition"
                      >
                        <td className="pl-4 py-3 text-gray-800 font-medium">
                          {task.title}
                        </td>
                        <td className="text-center py-3">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="text-center py-3">
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
          <div className="text-center py-6 text-sm text-taupe-400">No tasks found</div>
        ) : (
          <div className="flex flex-col gap-4">
            {groups
              .filter((groupData) => groupData.tasks.length > 0)
              .map((groupData) => (
                <div key={groupData.id} className="border border-taupe-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  <div className="bg-taupe-50 px-4 py-3 flex justify-between items-center">
                    <span className="text-sm font-semibold text-taupe-800">
                      {groupData.name}
                    </span>
                    <span className="text-[11px] font-medium bg-taupe-200 text-taupe-600 px-2 py-1 rounded-md">
                      {groupData.groupMembers?.[0]?.role || "Guest"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    {groupData.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="border border-taupe-100 rounded-lg p-3 bg-white active:scale-[0.99] transition"
                        onClick={() => navigate(`/tasks/${task.id}`)}
                      >
                        <div>
                    <p className="text-[11px] text-taupe-400 uppercase tracking-wide">
                      Title
                    </p>
                    <p className="text-sm font-semibold text-taupe-800 mt-1">
                      {task.title}
                    </p>
                  </div>
                        <div className="flex justify-between items-center mt-3">
                    <span className="text-[11px] text-taupe-400 uppercase tracking-wide">
                      Status
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                        <div className="flex justify-between items-center mt-2">
                    <span className="text-[11px] text-taupe-400 uppercase tracking-wide">
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
export default TeamTasks;
