import { useState, useEffect } from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
export function useKanbanTabs() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    completed: [],
  });
  const fetchGroups = async () => {
    try {
      const res = await Api.get("/user/groups", {
        headers: {
        "Cache-Control": "no-cache"
      }
      });
      setGroups(res.data.groups);
      
    } catch (err) {
      console.error(err);
    }
  };
  const fetchTasksByGroup = async (groupId) => {
  try {
    const res = await Api.get(
      `/groups/${groupId}/tasks`);
    const groupedTasks = {
      todo: [],
      in_progress: [],
      completed: []
    };
    res.data.forEach(task => {
      const status = task.status?.toLowerCase();
      if (groupedTasks[status]) {
        groupedTasks[status].push(task);
      }
    });
    setTasks(groupedTasks);
  } catch (err) {
    console.error(err);
  }
};
  const fetchKanban = async (groupId) => {
  try {
    const res = await Api.post(
      `/user/groups/${groupId}/kanbanSection`);
    const groupedTasks = {
      todo: res.data?.TODO || [],
      in_progress: res.data?.IN_PROGRESS || [],
      completed: res.data?.COMPLETED || []
    };
    setTasks(groupedTasks);
  } catch (err) {
    console.error(err);
  }
};
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  const updateTaskStatus = async (taskId, newStatus) => {
  try {
    setTasks(prev => {
      const updated = {
        todo: [],
        in_progress: [],
        completed: []
      };
      Object.values(prev)
        .flat().reverse()
        .forEach(task => {
          if (task.id === taskId) {
            updated[newStatus].push({
              ...task,
              status: newStatus
            });
          } else {
            updated[task.status].push(task);
          }
        });
      return updated;
    });
    await Api.post(`/task/update-task-status/${taskId}`,
      { status: newStatus }
    );
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    const loadgroups =async()=>{
      fetchGroups();
    };
    loadgroups();
  }, []);
  useEffect(() => {
    if (activeGroup) {
      (async()=>{
        await fetchKanban(activeGroup);
      })();
    }
  }, [activeGroup]);
  
  return {
    groups,
    activeGroup,            
    setActiveGroup,
    handleTaskClick,
    tasks,
    fetchTasksByGroup,
    updateTaskStatus
  };
}