import useIndividualTask from "../../hooks/Tasks/useIndividualTask";
import { ChevronLeft, ChevronRight } from "lucide-react";
const IndividualGroupTask = ({ tasksPerPage = 10 }) => {
  const {
    tasks,
    visibleTasks,
    currentTaskPage,
    setCurrentTaskPage,
    totalTaskPages,
    isUserInvolved,
    navigate,
  } = useIndividualTask(tasksPerPage);
  return (
    <div className="px-4">
      <div className="bg-white rounded-xl shadow-sm md:p-2 sm:p-5 mt-4">
        <div className="flex justify-between p-3 lg:py-0  items-center ">
          <div className="flex gap-3 items-center">
            <h2 className="font-semibold text-lg">Group Tasks</h2>
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
                    Math.min(prev + 1, totalTaskPages - 1),
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
        <div className="hidden md:block mx-4 mt-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium">Title</th>
                    <th className="text-center px-5 py-3 font-medium">
                      Status
                    </th>
                    <th className="text-center px-5 py-3 font-medium">
                      Priority
                    </th>
                  </tr>
                </thead>
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
                        onClick={() => navigate(`/tasks/${task.id}`)}
                        className={`border-t border-taupe-200 cursor-pointer transition hover:bg-gray-50 ${isUserInvolved(task) ? "bg-blue-50 hover:bg-blue-100" : "bg-white"}`}
                      >
                        <td className="px-5 py-3 font-medium text-gray-800">
                          {task.title}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-5 py-3 text-center">
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

      {/* mobile */}
      <div className="block p-3 pt-3  md:hidden">
        {tasks.length === 0 ? (
          <div className="text-center py-6 text-gray-400">No tasks found</div>
        ) : (
          <div className="flex flex-col  gap-3">
            {visibleTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className={`border rounded-lg p-4 mt-2 space-y-2 cursor-pointer
  ${isUserInvolved(task) ? "bg-blue-50  border-blue-500" : ""}
  `}
              >
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Title</span>
                  <span className="font-medium text-right">{task.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Group</span>
                  <span className="flex items-center gap-1">
                    Group #{task.group_id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Role</span>
                  <span>{task.role}</span>
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
    <span
      className={`inline-block min-w-auto text-center px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
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
      className={`inline-block min-w-auto text-center font-medium text-sm ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default IndividualGroupTask;
