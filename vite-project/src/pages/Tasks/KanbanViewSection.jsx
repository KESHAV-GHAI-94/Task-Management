import {DndContext,closestCorners,DragOverlay} from "@dnd-kit/core";
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
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    if (!taskId || !newStatus) return;
    await updateTaskStatus(taskId, newStatus);
  };

useEffect(() => {
    if (groups.length === 0) return;
    if (location.state?.groupId) {
      setActiveGroup(Number(location.state.groupId));
      return;
    }
    if (groupId) {
      setActiveGroup(Number(groupId));
      return;
    }
    if (!activeGroup) {
      setActiveGroup(groups[0].id);
    }
  }, [groups, location.state, groupId]);
  return (
    <div className="p-6">
      <div className="flex gap-3 border-b mb-6">
        {groups.map(group => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`
              px-4 py-2 rounded-t-lg font-medium
              ${activeGroup === group.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"}
            `}
          >
            {group.name}
          </button>
        ))}
      </div>
      <DndContext
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
      title="IN_PROGRESS"
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
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-300 w-[250px]">
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