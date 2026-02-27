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
            <span className="rounded-xl bg-zinc-200 px-2 text-taupe-500 text-sm">
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
                className="w-8 h-8 flex items-center justify-center rounded-md border border-taupe-200 hover:bg-taupe-100 disabled:opacity-40"
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
                className="w-8 h-8 flex items-center justify-center rounded-md border border-taupe-200 hover:bg-taupe-100 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:block mx-4 mt-4">
          <div className="bg-white border border-taupe-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-taupe-100 text-taupe-500 uppercase text-xs tracking-wide">
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
                        className="text-center py-6 text-taupe-400"
                      >
                        No tasks found
                      </td>
                    </tr>
                  ) : (
                    visibleTasks.map((task) => (
                      <tr
                        key={task.id}
                        onClick={() => navigate(`/tasks/${task.id}`)}
                        className={`border-t border-taupe-200 cursor-pointer transition hover:bg-taupe-50 ${isUserInvolved(task) ? "bg-taupe-50 hover:bg-taupe-100" : "bg-white"}`}
                      >
                        <td className="px-5 py-3 font-medium text-taupe-800">
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
<div className="block md:hidden px-3 mt-4">
  {tasks.length === 0 ? (
    <div className="text-center py-10 text-taupe-400 text-sm">
      No tasks found
    </div>
  ) : (
    <div className="space-y-3">
      {visibleTasks.map((task) => (
        <div
          key={task.id}
          onClick={() => navigate(`/tasks/${task.id}`)}
          className={`
            p-4 rounded-xl border shadow-sm
            transition-all duration-200
            active:scale-[0.98]
            ${isUserInvolved(task)
              ? "bg-taupe-50 border-taupe-400"
              : "bg-white border-taupe-200"}
          `}
        >
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-semibold text-taupe-800 text-sm leading-snug">
              {task.title}
            </h3>
            <StatusBadge status={task.status} />
          </div>
          <div className="flex justify-between items-center mt-3">
            <PriorityBadge priority={task.priority} />
            <span className="text-xs text-taupe-400">
              Group #{task.group_id}
            </span>
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

export default IndividualGroupTask;
