import React, { useState } from "react";
import Api from "../../Api";
import { toast } from "react-toastify";
const RightSideBar = ({
  task,
  currentUser,
  members,
  fetchTask,
  onDeleteClick,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  if (!task) return null;

  const handleUpdate = () => {
    if (!task) return;
    setUpdateData({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "Low",
      status: task.status || "Todo",
    });
    setSelectedAssignees(task.assigned_to?.map((user) => user.id) || []);
    setShowUpdateModal(true);
  };
  const handleAssigneeChange = (userId) => {
    if (selectedAssignees.includes(userId)) {
      setSelectedAssignees(selectedAssignees.filter((id) => id !== userId));
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
      const numericAssignees = selectedAssignees.map((id) => Number(id));
      await Api.post(
        `/task/update-task/${task.id}`,
        {
          ...updateData,
          assigned_to: numericAssignees,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Task updated successfully");
      setShowUpdateModal(false);
      fetchTask();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Update failed");
    }
  };
  return (
    <div className="hidden md:block w-full lg:w-[300px]">
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
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
              <p className="text-sm text-gray-500">{task.created_by?.email}</p>
              <p className="text-sm text-gray-500">{task.created_by?.role}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 gap-5">
          <h3 className="font-semibold mb-2">Assign Members</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {task.assigned_to?.map((user) => (
              <span
                key={user.id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {`${user.name}-  ${user.role}`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
          {currentUser?.role === "Owner" && (
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Update
            </button>
          )}
          {currentUser?.role === "Owner" && (
            <button
              onClick={onDeleteClick}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3">
          <div className="bg-white rounded-xl shadow-lg w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-2">Update Task</h2>
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
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedAssignees.map((userId) => {
                const user = members.find((m) => m.id === userId);
                if (!user) return null;
                return (
                  <span
                    key={userId}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {`${user.name}- ${user.role}`}
                  </span>
                );
              })}
            </div>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {members.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedAssignees.includes(member.id)}
                    onChange={() => handleAssigneeChange(member.id)}
                  />
                  <span className="font-medium">{member.name}</span>
                  <span className="text-gray-500 text-sm">({member.role})</span>
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
  );
};

export default RightSideBar;
