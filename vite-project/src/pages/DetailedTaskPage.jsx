import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "../Api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Reply, Pencil, Trash2, Check, X } from "lucide-react";
import DeleteModal from "../components/modals/DeleteModal";
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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [showReplyBox, setShowReplyBox] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  useEffect(() => {
    fetchTask();
    fetchComments();
  }, [id]);
  const axiosConfig = {
    withCredentials: true,
    headers: { "Cache-Control": "no-cache" },
  };
  const fetchTask = async () => {
    try {
      const res = await Api.get(`/task/view-task/${id}`,
        axiosConfig,
      );
      setTask(res.data.task);
      setCurrentUser(res.data.task.currentUser);
      const gid = res.data.task.group_id;
      setGroupId(gid);
      if (gid) fetchMembers(gid);
      setSelectedAssignees(
        res.data.task.assigned_to?.map((user) => user.id) || [],
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const fetchMembers = async (groupId) => {
    try {
      const res = await Api.get(`/user/groups/${groupId}/members`,
        axiosConfig,
      );
      setMembers(res.data.members);
    } catch (err) {
      console.error("Fetch members error:", err);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      await Api.post(`/task/delete-task/${taskId}`,
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
      await Api.post(`/task/update-task/${task.id}`,
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
  // comment
  const fetchComments = async () => {
    try {
      const res = await Api.post(`/comment/${id}/comments`,
        {},
        axiosConfig,
      );
      setComments(res.data.comments.reverse());
    } catch (err) {
      console.error("Fetch comments error:", err);
    }
  };
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await Api.post(`/comment/${id}/addcomment`,
        {
          comment: newComment,
        },
        { withCredentials: true },
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to add comment";
      toast.error(errorMessage);
    }
  };
  const handleReply = async (commentId) => {
    const text = replyText[commentId];
    if (!text?.trim()) return;
    try {
      await Api.post(`/comment/${commentId}/reply`,
        { comment: text },
        { withCredentials: true },
      );
      toast.success("Reply added");
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setShowReplyBox((prev) => ({ ...prev, [commentId]: false }));
      fetchComments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Reply failed");
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await Api.post(`/comment/${commentId}/delete`,
        {},
        { withCredentials: true },
      );
      toast.success("Comment deleted");
      fetchComments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };
  const handleEditComment = async (commentId) => {
    const text = editText[commentId];
    if (!text?.trim()) return;
    try {
      await Api.post(`/comment/${commentId}/update`,
        { comment: text },
        { withCredentials: true },
      );
      toast.success("Comment updated");
      setEditingCommentId(null);
      fetchComments();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  const confirmDeleteTask = async () => {
    await handleDelete(task.id);
    setShowDeleteModal(false);
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
    <div>
      <div className="flex flex-col lg:flex-row gap-5 p-3 sm:p-5">
        <div className="bg-white  w-full shadow-lg rounded-xl py-4 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col text-center sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-2xl font-bold ">{task.title}</h1>
            <div className="mb-4 flex  gap-2">
              <h3 className="font-semibold text-gray-600">Priority</h3>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {task.priority}
              </span>
            </div>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold text-gray-600">Description</h3>
            <p className="text-gray-800 mt-1">
              {task.description || "No description"}
            </p>
          </div>
          {/* commentssection */}
          <div className="mt-0">
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">
              Discussion
            </h3>
            <div className="relative">
              <div className="space-y-4 max-h-[340px] shadow-sm hover:shadow-md border border-gray-200 rounded-lg overflow-y-auto pe-2">
                {comments.length === 0 && (
                  <div className="ml-12 text-gray-400 text-sm">
                    No Discussion yet
                  </div>
                )}
                {comments.map((comment) => {
                  const isMine = comment.author?.id === currentUser?.id;
                  return (
                    <div key={comment.id} className="relative flex mb-3 gap-3">
                      <div className="relative z-10">
                        <div
                          className={`
                w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold
                ${isMine ? "bg-blue-600" : "bg-gray-500"}
              `}
                        >
                          {comment.author?.name?.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-gray-800">
                            {comment.author?.name}
                          </span>
                          {isMine && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-[1px] rounded">
                              You
                            </span>
                          )}
                          <span className="text-gray-400 text-xs">
                            {new Date(comment.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div
                          className={`mt-1 px-4 py-3 rounded-lg border text-sm ${isMine ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
                        >
                          {editingCommentId === comment.id ? (
                            <div className="flex gap-2">
                              <input
                                value={editText[comment.id] ?? comment.comment}
                                onChange={(e) =>
                                  setEditText((prev) => ({
                                    ...prev,
                                    [comment.id]: e.target.value,
                                  }))
                                }
                                className="border rounded px-2 py-1 text-sm w-full"
                              />
                              <Check
                                size={18}
                                className="cursor-pointer text-green-600"
                                onClick={() => handleEditComment(comment.id)}
                              />
                              <X
                                size={18}
                                className="cursor-pointer text-gray-500"
                                onClick={() => setEditingCommentId(null)}
                              />
                            </div>
                          ) : (
                            <div>{comment.comment}</div>
                          )}
                          <div className="flex gap-4 mt-2">
                            <Reply
                              size={16}
                              className="cursor-pointer text-gray-500 hover:text-blue-600"
                              onClick={() =>
                                setShowReplyBox((prev) => ({
                                  ...prev,
                                  [comment.id]: !prev[comment.id],
                                }))
                              }
                            />
                            {isMine && (
                              <Pencil
                                size={16}
                                className="cursor-pointer text-gray-500 hover:text-green-600"
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditText((prev) => ({
                                    ...prev,
                                    [comment.id]: comment.comment,
                                  }));
                                }}
                              />
                            )}
                            {isMine && (
                              <Trash2
                                size={16}
                                className="cursor-pointer text-gray-500 hover:text-red-600"
                                onClick={() => handleDeleteComment(comment.id)}
                              />
                            )}
                          </div>
                          {showReplyBox[comment.id] && (
                            <div className="mt-2 ml-2 flex gap-2">
                              <input
                                value={replyText[comment.id] || ""}
                                onChange={(e) =>
                                  setReplyText((prev) => ({
                                    ...prev,
                                    [comment.id]: e.target.value,
                                  }))
                                }
                                placeholder="Write reply..."
                                className="border rounded px-3 py-2 text-sm w-full"
                              />
                              <button
                                onClick={() => handleReply(comment.id)}
                                className="bg-blue-600 text-white px-4 rounded text-sm"
                              >
                                Send
                              </button>
                            </div>
                          )}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-10 mt-3 space-y-2">
                              {comment.replies.map((reply) => {
                                const isReplyMine =
                                  reply.author?.id === currentUser?.id;
                                return (
                                  <div key={reply.id} className="flex gap-2">
                                    <div
                                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs
            ${isReplyMine ? "bg-blue-600" : "bg-gray-500"}`}
                                    >
                                      {reply.author?.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 text-xs">
                                        <span className="font-semibold">
                                          {reply.author?.name}
                                        </span>
                                        {isReplyMine && (
                                          <span className="text-blue-500 text-xs">
                                            You
                                          </span>
                                        )}
                                        <span className="text-gray-400 text-xs">
                                          {new Date(
                                            reply.created_at,
                                          ).toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="border rounded px-3 py-2 bg-gray-50 text-sm">
                                        {reply.comment}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 border border-gray-200 rounded-lg bg-white p-4 shadow-sm hover:shadow-md">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex gap-5 w-full">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows={1}
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleAddComment}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  onClick={() => setShowDeleteModal(true)}
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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default DetailedTaskPage;
