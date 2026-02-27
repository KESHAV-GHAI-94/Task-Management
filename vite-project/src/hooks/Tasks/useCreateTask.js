import React, { useState, useEffect,useContext } from "react";
import Api from "../../Api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {TaskContext} from "../../Context/TaskContext";

export default function useCreateTask(){
    const {id} = useParams();
    const navigate= useNavigate();
    const {setTasks}= useContext(TaskContext);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        assigned_to: [],
      });
      const [loading,setLoading] = useState(false);
      useEffect(() => { 
        const fetchMembers = async () => {
          try {
            const res = await Api.get(`/user/groups/${id}/members`,
              {
              headers: {
            "Cache-Control": "no-cache"
          }}
            );
            setMembers(res.data.members);
          } catch (err) {
            toast.error("Failed to load members");
          }
        };
        fetchMembers();
      }, [id]);
        const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
      const handleAssign = (userId) => {
        if (form.assigned_to.includes(userId)) {
          setForm({
            ...form,
            assigned_to: form.assigned_to.filter(id => id !== userId),
          });
        } else {
          setForm({
            ...form,
            assigned_to: [...form.assigned_to, userId],
          });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
          return toast.error("Title is required");
        }
        try {
          setLoading(true);
          const res = await Api.post(`/task/${id}/create-task`,
            form
          );
          toast.success(res.data.message);
          setTasks(res.data.message);
          navigate(`/tasks`); //update it later till then i am redirecting to to tasks section
        } catch (err) {
          toast.error(err.response?.data?.message || "Task creation failed");
        } finally {
          setLoading(false);
        }
      };
      return {
    form,
    members,
    loading,
    handleChange,
    handleAssign,
    handleSubmit,
  };
}