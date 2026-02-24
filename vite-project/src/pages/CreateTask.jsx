import React, { useState, useEffect,useContext } from "react";
import Api from "../Api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {TaskContext} from "../Context/TaskContext";
const CreateTask = () => {
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
          { withCredentials: true,
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
        form,
        { withCredentials: true }
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
  return (
      <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Create Task
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 py-4 rounded-xl shadow space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter task description"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Assign Members
              </label>
              <div className="space-y-2">
                {members.map(member => (
                  <label
                    key={member.id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={form.assigned_to.includes(member.id)}
                      onChange={() => handleAssign(member.id)}
                    />
                    {member.name}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-taupe-700 text-white px-4 py-2 rounded hover:bg-taupe-800"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
  );
};

export default CreateTask;