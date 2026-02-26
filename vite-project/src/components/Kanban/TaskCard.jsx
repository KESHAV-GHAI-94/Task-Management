import { useDraggable } from "@dnd-kit/core";
import React from 'react';

const TaskCard = ({ task, onTaskClick,userRole }) => {
    const canDrag =
  userRole === "Owner" ||
  userRole === "Maintainer";
const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  isDragging
} = useDraggable({
  id: task.id,
  disabled: !canDrag  
});
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
      opacity: isDragging ? 0.2 : 1,
  };

  return (
    <div
            key={task.id}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() => onTaskClick && onTaskClick(task.id)}
            className="touch-none select-none cursor-grab active:cursor-grabbing bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:bg-blue-50 hover:border-blue-300 transition "
          >
            <h3 className="font-semibold text-sm text-gray-800">
              {task.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          </div>
  );
};

export default TaskCard;