import React, { useEffect, useState } from "react";
import Api from "../../Api";
import { toast } from "react-toastify";
import { Reply, Pencil, Trash2, Check, X } from "lucide-react";
const Comments = ({ taskId, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyText, setReplyText] = useState({});
    const [showReplyBox, setShowReplyBox] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState({});
const axiosConfig = {
    withCredentials: true,
    headers: { "Cache-Control": "no-cache" },
  };
  useEffect(() => {
    fetchComments();
  }, [taskId]);
 const fetchComments = async () => {
    try {
      const res = await Api.post(`/comment/${taskId}/comments`,
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
      await Api.post(`/comment/${taskId}/addcomment`,
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

  return (
    <div className="mt-4">
  <h3 className="font-semibold text-gray-800 mb-3 text-lg">
    Discussion
  </h3>
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-[420px] flex flex-col">
    <div className="overflow-y-auto px-3 py-2 space-y-3 flex-1">
      {comments.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-6">
          No discussions yet
        </div>
      )}
      {comments.map((comment) => {
        const isMine = comment.author?.id === currentUser?.id;
        return (
          <div key={comment.id} className="flex gap-3 group">
            <div className="flex-shrink-0">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow
                ${isMine ? "bg-blue-600" : "bg-gray-500"}
              `}>
                {comment.author?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800 text-sm">
                  {comment.author?.name}
                </span>
                {isMine && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-[2px] rounded-full">
                    You
                  </span>
                )}
                <span className="text-gray-400 text-xs">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <div className={`
                mt-1 px-2.5 py-1.5 rounded-lg text-sm border shadow-sm transition
                ${isMine
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"}
              `}>
                {editingCommentId === comment.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      value={editText[comment.id] ?? comment.comment}
                      onChange={(e) =>
                        setEditText((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                      className="flex-1 border rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                    <Check
                      size={18}
                      className="cursor-pointer text-green-600 hover:scale-110 transition"
                      onClick={() => handleEditComment(comment.id)}
                    />
                    <X
                      size={18}
                      className="cursor-pointer text-gray-500 hover:scale-110 transition"
                      onClick={() => setEditingCommentId(null)}
                    />
                  </div>
                ) : (
                  <p className="text-gray-700">{comment.comment}</p>
                )}
                <div className="flex gap-4 mt-2 opacity-0 group-hover:opacity-100 transition">
                  <Reply
                    size={16}
                    className="cursor-pointer text-gray-400 hover:text-blue-600"
                    onClick={() =>
                      setShowReplyBox((prev) => ({
                        ...prev,
                        [comment.id]: !prev[comment.id],
                      }))
                    }
                  />
                  {isMine && (
                    <>
                      <Pencil
                        size={16}
                        className="cursor-pointer text-gray-400 hover:text-green-600"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditText((prev) => ({
                            ...prev,
                            [comment.id]: comment.comment,
                          }));
                        }}
                      />
                      <Trash2
                        size={16}
                        className="cursor-pointer text-gray-400 hover:text-red-600"
                        onClick={() =>
                          handleDeleteComment(comment.id)
                        }
                      />
                    </>
                  )}
                </div>
                {showReplyBox[comment.id] && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={replyText[comment.id] || ""}
                      onChange={(e) =>
                        setReplyText((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                      placeholder="Write a reply..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                <button
                      onClick={() => handleReply(comment.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg text-sm"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
              {/* Replies */}
              {comment.replies?.length > 0 && (
                <div className="ml-8 mt-3 space-y-3 border-l pl-4">
                  {comment.replies.map((reply) => {
                    const isReplyMine =
                      reply.author?.id === currentUser?.id;
                    return (
                      <div key={reply.id} className="flex gap-2">
                        <div className={`
                          w-7 h-7 rounded-full flex items-center justify-center text-white text-xs
                          ${isReplyMine ? "bg-blue-600" : "bg-gray-500"}
                        `}>
                          {reply.author?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-gray-50 border rounded-lg px-3 py-2 shadow-sm">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold">
                              {reply.author?.name}
                            </span>
                            {isReplyMine && (
                              <span className="text-blue-600">
                                You
                              </span>
                            )}
                            <span className="text-gray-400">
                              {new Date(reply.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {reply.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
    {/* Add Comment */}
    <div className="border-t border-taupe-300 p-4 bg-gray-50">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 flex gap-2">
          <input
            value={newComment}
            onChange={(e) =>
              setNewComment(e.target.value)
            }
            placeholder="Write a comment..."
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg text-sm font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Comments;