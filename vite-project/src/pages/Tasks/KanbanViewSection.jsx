import {DndContext,closestCorners,DragOverlay,useSensor,useSensors,PointerSensor,TouchSensor} from "@dnd-kit/core";
import { useKanbanTabs } from "../../hooks/useKanbanTabs";
import { useParams,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import KanbanColumn from "../../components/Kanban/KanbanColumn";
const KanbanViewSection = () => {
  const { groupId } = useParams();
  const location= useLocation();
  const [activeTask, setActiveTask] = useState(null);
  
  const {
    groups,
    activeGroup,
    setActiveGroup,
    handleTaskClick,
    tasks,
    updateTaskStatus
  } = useKanbanTabs();

  const currentGroup = groups.find(g => g.id === activeGroup);
  const userRole = currentGroup?.role;
useEffect(() => {
  if (!groups.length) return;
  let initialGroup = null;
  if (location.state?.groupId) {
    initialGroup = Number(location.state.groupId);
  } else if (groupId) {
    initialGroup = Number(groupId);
  } else {
    initialGroup = groups[0].id;
  }
  setActiveGroup(initialGroup);
}, [groups, location.state?.groupId, groupId,setActiveGroup]);
  
  // mobile 
  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  }),
);

  return (
    <div className="p-3 sm:p-6">
      <div className="flex gap-2 sm:gap-3 border-b mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {groups.map(group => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`
              px-2 py-0 md:py-2 rounded-t-lg cursor-pointer font-medium
              ${activeGroup === group.id
                ? "bg-taupe-500 text-white"
                : "bg-taupe-200 text-gray-700"}
            `}
          >
            <div className="text-center ">
            <div className=" text-center"><p className="text-xs md:text-sm">{group.name}</p></div>
            <span className={`inline-block my-1 text-xs px-1 md:px-2 py-0.5 rounded-full font-medium
                ${
                  group.role === "Owner"
                    ? "bg-purple-100 text-purple-700"
                    : group.role === "Maintainer"
                      ? "bg-blue-100 text-blue-700"
                      : group.role === "Developer"
                        ? "bg-green-100 text-green-700"
                        : group.role === "Tester"
                          ? "bg-yellow-100 text-yellow-700"
                          : group.role === "Guest"
                            ? "bg-pink-100 text-pink-700"
                            : group.role === "Designer"
                            ? "bg-pink-100 text-pink-700"
                            : group.role === "Seo"
                            ? "bg-gray-100 text-gray-700"
                            : group.role === "Project Manager"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                }
              `}>{group.role}</span>
            </div>
          </button>
        ))}
      </div>
      <DndContext
      sensors={sensors}
  collisionDetection={closestCorners}
  onDragStart={(event) => {
    const taskId = event.active.id;
    const allTasks = [
      ...tasks.todo,
      ...tasks.in_progress,
      ...tasks.completed
    ];
    const task = allTasks.find(t => t.id === taskId);
    setActiveTask(task);
  }}
  onDragEnd={async (event) => {
    const { active, over } = event;
    if (over) {
      await updateTaskStatus(
        active.id,
        over.id
      );
    }
    setActiveTask(null);
  }}
  onDragCancel={() => setActiveTask(null)}
>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <KanbanColumn
      id="todo"
      title="TODO"
      tasks={tasks.todo}
      color="gray"
      onTaskClick={handleTaskClick}
      userRole={userRole}
    />

    <KanbanColumn
      id="in_progress"
      title="IN PROGRESS"
      tasks={tasks.in_progress}
      color="yellow"
      onTaskClick={handleTaskClick}
      userRole={userRole}
    />

    <KanbanColumn
      id="completed"
      title="COMPLETED"
      tasks={tasks.completed}
      color="green"
      onTaskClick={handleTaskClick}
      userRole={userRole}
    />
  </div>
  <DragOverlay>
    {activeTask ? (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-300 w-auto">
        <h3 className="font-semibold text-sm text-gray-800">
          {activeTask.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {activeTask.description}
        </p>
      </div>
    ) : null}
  </DragOverlay>
</DndContext>
    </div>
  );
};

export default KanbanViewSection;