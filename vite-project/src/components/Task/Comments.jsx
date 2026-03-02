import React, { useEffect, useState } from "react";
import Api from "../../Api";
import { toast } from "react-toastify";
import CommentItem from "./CommentItem";
const Comments = ({ taskId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  const fetchComments = async () => {
    try {
      const res = await Api.post(
        `/comment/${taskId}/comments`);
      setComments(res.data.comments.reverse());
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    const loadComments = async () => {
      await fetchComments();
    };
    loadComments();
  }, [taskId]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await Api.post(
        `/comment/${taskId}/addcomment`,
        { comment: newComment }
      );
      setNewComment("");
      fetchComments();
    } catch {
      toast.error("Failed to add comment");
    }
  };
  return (
    <div className="mt-8 bg-white rounded-lg md:rounded-xl ">
      <div className="px-3 md:px-4 py-2 border-b border-taupe-200 md:py-3 rounded-t-lg md:rounded-t-xl">
        <h3 className="font-semibold text-gray-800 text-sm md:text-lg">
          Discussion
        </h3>
      </div>
      <div className="px-2 md:px-4 py-2 md:py-3 space-y-2 md:space-y-3 min-h-[325px] h-auto">
        {comments.length === 0 && (
          <div className="text-center text-gray-400 py-4 text-xs md:text-sm">
            No Discussion yet
          </div>
        )}
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            fetchComments={fetchComments}
            currentUser={currentUser}
          />
        ))}
      </div>
      <div className="border-t border-taupe-300 px-2 md:px-4 py-2 md:py-3 bg-gray-50 rounded-b-lg md:rounded-b-xl">
        <div className="flex gap-2">
          <input
            value={newComment}
            onChange={(e) =>
              setNewComment(e.target.value)
            }
            placeholder="Discuss..."
            className="flex-1 border border-taupe-300 rounded-lg px-3 py-2 text-xs md:text-sm focus:ring-2 focus:ring-taupe-400 outline-none"/>
          <button
            onClick={addComment}
            className="bg-taupe-500 cursor-pointer hover:bg-taupe-600 active:scale-95 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;