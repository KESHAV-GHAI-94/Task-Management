import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Api from "../../Api";
const AddMemberGroupModal = ({ isOpen, onClose,fetchMember }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Developer");

  if (!isOpen) return null;
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setUsers([]);
      return;
    }
    try {
      const res = await Api.get(`/user/search?query=${value}&groupId=${id}`,
        { withCredentials: true ,
        headers: {
        "Cache-Control": "no-cache"
      }}
      );
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  const AddMember = async (userId) => {
    try {
      const res = await Api.post(`/user/groups/${id}/members`,
        {
          userId,
          role: selectedRole,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setUsers(users.filter((u) => u.id !== userId));
      setSelectedUserId(null);
      setSelectedRole("Developer");
      fetchMember();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding member");
    }
  };

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>
      <div className="relative bg-taupe-50 px-4 mx-4 w-full max-w-lg rounded-xl shadow-lg p-5">
        <div className="flex justify-between px-2 items-center border-b border-taupe-300 pb-3">
          <h2 className="text-sm md:text-lg font-semibold">
            Add Member to Group
          </h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="mt-4 px-2">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search user by name or email..."
            className="w-full p-1 md:p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-taupe-500"
          />
        </div>
        <div className="mt-4 max-h-78 overflow-y-auto">
          {users.length === 0 && query && (
            <p className="text-center text-gray-400 py-3">
              No users found
            </p>
          )}
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-2 md:p-3 mb-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm md:text-md font-medium">{user.name}</p>
                  <p className="text-xs md:text-md text-taupe-500">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedUserId(user.id)}
                  className="bg-taupe-500 text-white text-sm py-1 px-2 md:px-3 md:py-1 cursor-pointer rounded-md hover:bg-taupe-600"
                >
                  Add
                </button>
              </div>
              {selectedUserId === user.id && (
                <div className="flex gap-2  mt-2 md:mt-3">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border p-1 md:p-2 rounded-md text-sm cursor-pointer flex-1"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Tester">Tester</option>
                    <option value="Maintainer">Maintainer</option>
                    <option value="Designer">Designer</option>
                    <option value="Seo">Seo</option>
                    <option value="Project Manager">Project Manager</option>
                  </select>
                  <button
                    onClick={() => AddMember(user.id)}
                    className="bg-taupe-400 cursor-pointer text-white text-sm px-1.5 py-1 md:px-3 md:py-2 rounded-md hover:bg-taupe-600"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMemberGroupModal;