import Api from "../Api";
import { useState, useEffect } from "react";
import KanbanColumn from "../components/KanbanColumn";
import { useParams, useNavigate } from "react-router-dom";
const Kanban = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  });
  const navigate = useNavigate();
  const fetchKanbanTasks = async () => {
    try {
      const res = await Api.post(
        `/user/groups/${id}/kanbanSection`,
        {},
        { withCredentials: true },
      );
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  useEffect(() => {
    if (id) {
      fetchKanbanTasks();
    }
  }, [id]);
  return (
    <div className="p-6">
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
      >
        <KanbanColumn
          title="TODO"
          tasks={tasks.TODO}
          color="gray"
          onTaskClick={handleTaskClick}
        />

        <KanbanColumn
          title="IN_PROGRESS"
          tasks={tasks.IN_PROGRESS}
          color="yellow"
          onTaskClick={handleTaskClick}
        />

        <KanbanColumn
          title="COMPLETED"
          tasks={tasks.COMPLETED}
          color="green"
          onTaskClick={handleTaskClick}
        />
      </div>
    </div>
  );
};

export default Kanban;
