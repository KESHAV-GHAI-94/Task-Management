import React from "react";

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="bg-gray-200 lg:h-[400px]  p-4 rounded-lg">
      <h2 className="text-lg font-bold text-center mb-4">
        {title}
      </h2>
      <div className="space-y-8">
        {tasks.length === 0 && (
          <p className="text-gray-500 mt-20 text-center  text-sm">
            No tasks
          </p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-3 rounded shadow"
          >
            <h3 className="font-semibold">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">
              {task.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;