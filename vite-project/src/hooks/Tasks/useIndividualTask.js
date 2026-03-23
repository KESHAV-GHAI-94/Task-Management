import React, { useState, useEffect } from "react";
import Api from "../../Api";
import { useAuth } from "../../Context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
export default function useIndividualTask(tasksPerPage){
const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [tasks, setTasks] = useState([]);
  const [currentTaskPage, setCurrentTaskPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalTaskPages = Math.ceil(tasks.length / tasksPerPage);
  const visibleTasks = tasks.slice(
    currentTaskPage * tasksPerPage,
    currentTaskPage * tasksPerPage + tasksPerPage
  );
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await Api.post(
        `/user/groups/${id}/tasks`,
        {
          headers: { "Cache-Control": "no-cache" },
        }
      );
      const filteredTasks = res.data.tasks.filter(
        (task) => task.group_id === Number(id)
      );
      setTasks(filteredTasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
    setCurrentTaskPage(0); 
  }, [id]);
  const isUserInvolved = (task) => {
    if (!currentUserId) return false;
    const isCreator = task.created_by === currentUserId;
    const isAssigned = task.assignedUsers?.some(
      (user) => user.id === currentUserId
    );
    return isCreator || isAssigned;
  };
  return {
    tasks,
    visibleTasks,
    loading,
    currentTaskPage,
    setCurrentTaskPage,
    totalTaskPages,
    isUserInvolved,
    navigate,
    fetchTasks,
  };
}