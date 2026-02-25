import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
const KanbanColumn = ({ id, title, tasks=[], color, onTaskClick,userRole }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });
  const columnColors = {
    gray: {
      bg: "bg-gray-100",
      header: "bg-gray-200 text-gray-700",
      border: "border-gray-300",
    },
    yellow: {
      bg: "bg-yellow-50",
      header: "bg-yellow-200 text-yellow-800",
      border: "border-yellow-300",
    },
    green: {
      bg: "bg-green-50",
      header: "bg-green-200 text-green-800",
      border: "border-green-300",
    },
  };
  const selected = columnColors[color] || columnColors.gray;
  return (
    <div
  ref={setNodeRef}
  className={`${selected.bg} p-3 lg:h-[450px] rounded-xl border ${selected.border} flex flex-col min-h-[200px]`}
>
      <div
        className={`${selected.header} text-sm font-semibold text-center py-2 rounded-lg mb-3 `}
      >
        {title} ({tasks?.length})
      </div>
      <div className="space-y-3  flex-1 pr-1">
        {tasks?.length === 0 && (
          <p className="text-gray-400 text-center text-sm mt-10">No tasks</p>
        )}
        {tasks.map((task) => (
          <TaskCard
          key={task.id}
          task={task}
          onTaskClick={onTaskClick}
          userRole={userRole}
        />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
