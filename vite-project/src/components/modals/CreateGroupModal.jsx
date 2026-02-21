import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
const CreateGroupModal = ({ onClose }) => {
  const [gname, setgname] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreateGroup = async () => {
    if (!gname.trim()) {
      toast.error("Group name required");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/user/groups",
        {
          name: gname,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      onClose();
      window.location.reload();
      toast.success("Group created Successfuly")
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating group");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">
          Create Your Own Group
        </h2>
        <label className="block mb-2 text-sm font-medium">
          Group Name
        </label>
        <input
          type="text"
          placeholder="Enter Group name"
          value={gname}
          onChange={(e) => setgname(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-taupe-600"
        />
        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className="w-full bg-taupe-600 hover:bg-taupe-700 text-white p-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;