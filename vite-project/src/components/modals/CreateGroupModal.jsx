import React, { useState } from "react";
import Api from "../../Api";
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
      const res = await Api.post("/user/groups",
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
        <h2 className="text-md md:text-xl font-semibold text-center mb-4">
          Create Your Own Group
        </h2>
        <label className="block mb-2 text-xs md:text-sm font-medium">
          Group Name
        </label>
        <input
          type="text"
          placeholder="Enter Group name"
          value={gname}
          onChange={(e) => setgname(e.target.value)}
          className="w-full border rounded-lg p-1.5 mb-3 md:p-3 md:mb-4 focus:ring-2 focus:ring-taupe-600"
        />
        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className="w-full bg-taupe-600 cursor-pointer hover:bg-taupe-700 text-white p-1.5 md:p-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;