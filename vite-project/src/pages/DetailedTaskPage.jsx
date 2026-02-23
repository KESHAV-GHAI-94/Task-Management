import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const DetailedTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupId, setGroupId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [members, setMembers] = useState([]);
const [selectedAssignees, setSelectedAssignees] = useState([]);
const [updateData, setUpdateData] = useState({
  title: "",
  description: "",
  priority: "",
  status: "",
});

  useEffect(() => {
    fetchTask();
  }, [id]);
  const fetchTask = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/task/view-task/${id}`,
        {
          withCredentials: true,
        },
      );
      setTask(res.data.task);
      setCurrentUser(res.data.task.currentUser);
      const gid =
  res.data.task.group_id ||
  res.data.task.groupId ||
  res.data.task.group?.id ||
  res.data.task.Group?.id;

setGroupId(gid);

if (gid) fetchMembers(gid);
      setSelectedAssignees(
      res.data.task.assigned_to?.map(user => user.id) || []
    );
    const groupId =
  res.data.task.group_id ||
  res.data.task.groupId ||
  res.data.task.group?.id ||
  res.data.task.Group?.id;
if (groupId) {
  fetchMembers(groupId);
}
    setLoading(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const fetchMembers = async (groupId) => {
  try {

    const res = await axios.get(
      `http://localhost:4000/user/groups/${groupId}/members`,
      {
        withCredentials: true
      }
    );

    setMembers(res.data.members);

  } catch (err) {
    console.error("Fetch members error:", err);
  }
};
  const handleDelete = async (taskId) => {
    try {
      await axios.post(
        `http://localhost:4000/task/delete-task/${taskId}`,
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
const handleUpdate = () => {

  if (!task) return;

  setUpdateData({
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "Low",
    status: task.status || "Todo",
  });

  setSelectedAssignees(
    task.assigned_to?.map(user => user.id) || []
  );

  setShowUpdateModal(true);

  fetchMembers(groupId);

};

const handleAssigneeChange = (userId) => {
  if (selectedAssignees.includes(userId)) {
    setSelectedAssignees(
      selectedAssignees.filter(id => id !== userId)
    );
  } else {
    setSelectedAssignees([...selectedAssignees, userId]);
  }
};
const handleChange = (e) => {
  setUpdateData({
    ...updateData,
    [e.target.name]: e.target.value,
  });
};
const handleUpdateSubmit = async () => {
  try {

    const numericAssignees = selectedAssignees.map(id => Number(id));

    await axios.post(
      `http://localhost:4000/task/update-task/${task.id}`,
      {
        ...updateData,
        assigned_to: numericAssignees
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Task updated successfully");
    setShowUpdateModal(false);
    fetchTask();

  } catch (err) {
    console.error(err.response?.data || err);
    toast.error("Update failed");
  }
};
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Task not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        <div className="flex justify-end gap-5">
          <div className="bg-white w-full shadow-lg rounded-xl ms-5 mt-5 py-6 p-8 ">
            <div className="flex justify-between text-center ">
              <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
              <div className="mb-4 flex-col gap-2">
                <h3 className="font-semibold text-gray-600">Priority</h3>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {task.priority}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-600">Description</h3>
              <p className="text-gray-800 mt-1">
                {task.description || "No description"}
              </p>
            </div>
            {/* commentssection */}
          </div>
          <div className="h-full mt-2 bg-gray-100 flex justify-center items-start pt-2 pe-5">
            <div className="bg-white w-full shadow-lg rounded-xl p-8">
              <div className="flex justify-between md:gap-20 text-center">
                <div className="mb-4 flex-col">
                  <h3 className="font-semibold text-gray-600">Status</h3>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {task.status}
                  </span>
                </div>
                <div className="mb-4 flex-col gap-2">
                  <h3 className="font-semibold text-gray-600">Created By:</h3>
                  <div>
                    <p className="font-medium">{task.created_by?.name}</p>
                    <p className="text-sm text-gray-500">
                      {task.created_by?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {task.created_by?.role}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 gap-5">
                <h3 className="font-semibold mb-2">Assign Members</h3>

<div className="flex flex-wrap gap-2 mb-3">
  {task.assigned_to?.map(user => (
    <span
      key={user.id}
      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
    >
      {user.name}
    </span>
  ))}
</div>
 
              </div>
              <div className="flex justify-end gap-3 mt-6">
              {currentUser?.role === "Owner" && (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Update
                </button>)}
                {currentUser?.role === "Owner" && (
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {showUpdateModal && (
  <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-[500px] p-6">
      <h2 className="text-xl font-bold mb-4">Update Task</h2>
      <input
        type="text"
        name="title"
        value={updateData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded mb-3"
      />
      <textarea
        name="description"
        value={updateData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded mb-3"
      />
      <select
        name="priority"
        value={updateData.priority}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        name="status"
        value={updateData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <h3 className="font-semibold mb-2">Assign Members</h3>

{/* Selected users preview */}
<div className="flex flex-wrap gap-2 mb-3">
  {selectedAssignees.map(userId => {
    const user = members.find(m => m.id === userId);
    if (!user) return null;

    return (
      <span
        key={userId}
        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
      >
        {user.name}
      </span>
    );
  })}
</div>

{/* Checkbox list */}
<div className="max-h-40 overflow-y-auto border rounded p-2">

  {members.map(member => (
  <label
    key={member.id}
    className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
  >
    <input
      type="checkbox"
      checked={selectedAssignees.includes(member.id)}
      onChange={() => handleAssigneeChange(member.id)}
    />

    <span className="font-medium">
      {member.name}
    </span>

    <span className="text-gray-500 text-sm">
      ({member.role})
    </span>

  </label>
))}

</div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowUpdateModal(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default DetailedTaskPage;
