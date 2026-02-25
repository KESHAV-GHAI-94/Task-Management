import React, { useEffect, useState } from "react";
import Api from "../../Api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useTaskDetails(){
      const { id } = useParams();
      const navigate = useNavigate();
      const [task, setTask] = useState(null);
      const [loading, setLoading] = useState(true);
      const [groupId, setGroupId] = useState(null);
      const [currentUser, setCurrentUser] = useState(null);
      const [members, setMembers] = useState([]);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      useEffect(() => {
        fetchTask();
      }, [id]);
      const axiosConfig = {
        withCredentials: true,
        headers: { "Cache-Control": "no-cache" },
      };
      const fetchTask = async () => {
        try {
          const res = await Api.get(`/task/view-task/${id}`, axiosConfig);
          setTask(res.data.task);
          setCurrentUser(res.data.task.currentUser);
          const gid = res.data.task.group_id;
          setGroupId(gid);
          if (gid) fetchMembers(gid);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };
      const fetchMembers = async (groupId) => {
        try {
          const res = await Api.get(`/user/groups/${groupId}/members`, axiosConfig);
          setMembers(res.data.members);
        } catch (err) {
          console.error("Fetch members error:", err);
        }
      };
      const handleDelete = async (taskId) => {
        try {
          await Api.post(
            `/task/delete-task/${taskId}`,
            {},
            {
              withCredentials: true,
            },
          );
          toast.success("Task deleted");
          navigate(`/tasks`);
        } catch (err) {
          console.error(err);
        }
      };
      const confirmDeleteTask = async () => {
        await handleDelete(task.id);
        setShowDeleteModal(false);
      };
return {
  id,
  task,
  loading,
  currentUser,
  members,
  fetchTask,
  showDeleteModal,
  setShowDeleteModal,
  confirmDeleteTask,
};
}